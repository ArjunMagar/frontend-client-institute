import Link from "next/link";


function StudentSidebar() {

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/";


  }

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 bg-cordes-dark shadow-xl z-50 bg-blue-700">
        <div className="flex items-center justify-center h-16 bg-cordes-blue bg-blue-800">
          <div className="flex items-center space-x-3">
            <span className="text-white text-xl font-bold">
              Student Panel
            </span>
          </div>
        </div>
        <div className="mt-8 px-4">
          <div className="space-y-2">
            <Link
              href="/student/dashboard"
              className="flex items-center px-4 py-3 text-gray-200 hover:bg-blue-900 hover:text-white rounded-lg transition duration-300 group font-bold "
            >
              <i className="fas fa-home mr-3 text-cordes-accent group-hover:text-white" />
              Dashboard
            </Link>
     
            <Link
              href="/student/dashboard/courses"
              className="flex items-center px-4 py-3 text-gray-200 hover:bg-blue-900 hover:text-white rounded-lg transition duration-300 group font-bold"
            >
              <i className="fas fa-chart-bar mr-3 text-gray-400 group-hover:text-white" />
              Course
            </Link>
      
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png"
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <a onClick={handleLogout} className="text-white hover:text-red-700 text-lg font-bold cursor-pointer">Logout</a>
                <p className="text-gray-400 text-sm"> Student logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentSidebar;
