import { motion } from 'framer-motion'

function Schedule() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-rose-500">
          CSEUTSAV'25 EVENT SCHEDULE
        </h1>

        {/* Day 1 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 1 - 17/03/25
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 p-4">TIME SLOTS</th>
                  <th className="border border-gray-700 p-4">EVENTS</th>
                  <th className="border border-gray-700 p-4">EVENTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    9:00 am-10:35am
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Design under Pressure</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Pitch Perfect</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    10:55 am-12:35pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Code Dejavu</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Escape Room</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    2:00 pm-4:00 pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Oops Fix it!</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Digital Dynamo</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Day 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 2 - 18/03/25
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 p-4">TIME SLOTS</th>
                  <th className="border border-gray-700 p-4">EVENTS</th>
                  <th className="border border-gray-700 p-4">EVENTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    9:00 am-10:35am
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Code with Comali</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Code Free</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    10:55 am-12:35pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Bite Bidders</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Tech Pictionary</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    2:00 pm-4:00 pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Logical Baton</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>IPL Auction</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Day 3 */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 3 - 19/03/25
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-4">
                    <div>Clip Craft</div>
                    <div className="text-sm text-gray-400">(Online Event)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Day 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 4 - 21/03/25
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-4">
                    <div>Flame-Free Feast</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Schedule
