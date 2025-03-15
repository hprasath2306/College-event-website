import { motion } from 'framer-motion'

function Schedule() {
  return (
    <div className="min-h-screen text-white p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-6xl md:text-7xl font-['Righteous'] mb-4 animate-slideDown">
            Events <span className="text-[#FFF]">Schedule</span>
          </h1>

        {/* Day 1 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 1 - 19/03/25
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
                    <div>Digital Dynamo</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    10:55 am-12:35pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Code With Comali</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400"></div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    2:00 pm-4:00 pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Byte Bidders</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400"></div>
                  </td>
                </tr>

                 <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    11:00 am-4:00 pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400"></div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>The Franchise Formation</div>
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
            DAY 2 - 20/03/25
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
                    <div>Oops Fix it!</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400"></div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    9:30 am-12:00am
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>The Algorithmic Palate</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400"></div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-4 text-center">
                    10:55 am-12:35pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Logical Baton</div>
                    <div className="text-sm text-gray-400">(Lab)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>-</div>
                    <div className="text-sm text-gray-400">-</div>
                  </td>
                </tr>
          
              </tbody>
            </table>
          </div>
        </div>

        {/* Day 3 */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            DAY 3 - 21/03/25
          </h2>
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
                    11:30 am - 12:30pm
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Project Expo</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                  <td className="border border-gray-700 p-4">
                    <div>Code Free</div>
                    <div className="text-sm text-gray-400">(Classroom)</div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

      </motion.div>
    </div>
  )
}

export default Schedule
