<div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-900 text-white bg-[url('/src/assets/logo.png')] bg-center bg-no-repeat bg-opacity-10">
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/roadmap" element={<Roadmap />} />
    <Route path="/team" element={<Team />} />
    <Route path="/whitepaper" element={<WhitepaperPage />} />
  </Routes>
  <Footer />
</div>

