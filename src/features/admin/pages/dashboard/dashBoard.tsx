import Navbar from "../../components/layout/NavBar" 

export default function Dashboard() {
  return (
    <>
      <Navbar title="Dashboard" />

      <section className="bg-black/30 border border-gray-800 rounded-xl p-10 text-center">
        <h2 className="text-lg font-semibold mb-2 text-white/90">Overview</h2>
        <p className="text-gray-400">Dashboard content</p>
      </section>
    </>
  )
}
