
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Weather & Alerts</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="card">
    <h1>Live Weather</h1>

    <form id="searchForm">
      <input type="text" id="cityInput" placeholder="Enter city e.g. Delhi" required />
      <button type="submit">Fetch</button>
    </form>

    <section id="current"></section>
    <section id="alerts"></section>
    <section id="forecast"></section>
  </main>

  <script src="script.js"></script>
</body>
</html>