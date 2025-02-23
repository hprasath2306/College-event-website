import { useState } from 'react'
import * as XLSX from 'xlsx'
import { motion } from 'framer-motion'
import axios from 'axios'

interface Student {
  name: string
  regNo: string
}

function StudentUpload() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const transformData = (data: any[]): Student[] => {
    return data.map(row => ({
      name: row.name || row.Name || row.NAME || '',  // handle different possible column names
      regNo: String(row.regNo || row.RegNo || row.REGNO || row['RegisterNo'] || row['REG NO'] || '')
    })).filter(student => student.name && student.regNo) // filter out invalid entries
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setMessage(null)

      // Read the Excel file
      const reader = new FileReader()
      reader.onload = async (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rawData = XLSX.utils.sheet_to_json(worksheet)
        
        // Transform data to required format
        const transformedData = transformData(rawData)
        // console.log('Transformed data:', transformedData)

        if (transformedData.length === 0) {
          setMessage({
            text: 'No valid student data found. Please check the file format.',
            type: 'error'
          })
          return
        }

        try {
          // Send data to API
          const response = await axios.post('https://symposium-api-production.up.railway.app/api/students/bulk', transformedData)
          setMessage({
            text: `Successfully uploaded ${transformedData.length} students!`,
            type: 'success'
          })
        } catch (error) {
          setMessage({
            text: 'Failed to upload students. Please check the file format and try again.',
            type: 'error'
          })
          console.error('Upload error:', error)
        }
      }

      reader.readAsArrayBuffer(file)
    } catch (error) {
      setMessage({
        text: 'Error reading file. Please make sure it\'s a valid Excel file.',
        type: 'error'
      })
      console.error('File reading error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Upload Students</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl mb-2">Instructions:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Prepare an Excel file with student details</li>
              <li>Required columns: name, regNo</li>
              <li>Column headers should be "name" and "regNo" (case insensitive)</li>
              <li>File should be in .xlsx or .xls format</li>
            </ul>
          </div>

          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className={`
                inline-block px-6 py-3 rounded-lg cursor-pointer
                ${uploading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-rose-500 hover:bg-rose-600'}
                transition-colors duration-200
              `}
            >
              {uploading ? 'Uploading...' : 'Choose Excel File'}
            </label>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="mt-6 text-sm text-gray-400">
            <p>Note: Make sure your Excel file follows the required format.</p>
            <p>For any issues, please contact the administrator.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StudentUpload
