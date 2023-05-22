const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const leffat = [
  {
    id: 1,
    Title: 'Pirates of the Caribbean',
    Director: 'Gore Verbinski',
  },
  {
    id: 2,
    Title: 'Godfather',
    Director: 'Francis Ford Coppola',
  },
  {
    id: 3,
    Title: 'Spiderman',
    Director: 'Marvel Studios',
  },
  {
    id: 4,
    Title: 'Lord of the Rings: Fellowship of the Ring',
    Director: 'Peter Jackson',
  },
  {
    id: 5,
    Title: 'Inception',
    Director: 'Christopher Nolan',
  },
  {
    id: 6,
    Title: 'The Shawshank Redemption',
    Director: 'Frank Darabont',
  },
  {
    id: 7,
    Title: 'The Dark Knight',
    Director: 'Christopher Nolan',
  },
  {
    id: 8,
    Title: 'Jurassic Park',
    Director: 'Steven Spielberg',
  },
  {
    id: 9,
    Title: 'Harry Potter and the Sorcerer\'s Stone',
    Director: 'Chris Columbus',
  },
  {
    id: 10,
    Title: 'Avatar',
    Director: 'James Cameron',
  },
  {
    id: 11,
    Title: 'The Matrix',
    Director: 'Lana Wachowski, Lilly Wachowski',
  },
  {
    id: 12,
    Title: 'Titanic',
    Director: 'James Cameron',
  },
  {
    id: 13,
    Title: 'Star Wars: Episode IV - A New Hope',
    Director: 'George Lucas',
  },
  {
    id: 14,
    Title: 'The Lion King',
    Director: 'Roger Allers, Rob Minkoff',
  },
  {
    id: 15,
    Title: 'Back to the Future',
    Director: 'Robert Zemeckis',
  },
];

app.post('/create', (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: 'Ei tyhjiä kenttiä!',
    });
  }

  const { Director, Title } = req.body;

  if (!Director || !Title) {
    res.status(400).json({
      message: 'Syötä ohjaaja sekä elokuvan nimi!',
    });
  }

  const newMovie = {
    id: leffat.length + 1,
    Director,
    Title,
  };

  try {
    leffat.push(newMovie);
    res.status(201).json({
      message: 'Elokuva lisätty onnistuneesti!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Elokuvan lisäys epäonnistui.',
    });
  }
});

app.get('/leffat', (req, res) => {
  try {
    res.status(200).json(leffat); // Send the 'leffat' array in the response body
  } catch (error) {
    res.status(500).json({
      message: 'Kaikkien elokuvien haku epäonnistui.',
    });
  }
});

app.get('/leffat/:leffaID', (req, res) => {
  const id = parseInt(req.params.leffaID);

  try {
    let leffa = leffat.find((leffa) => leffa.id === id);
    if (!leffa) {
      return res.status(404).json({
        message: 'Elokuvaa ei löytynyt.',
      });
    }
    res.status(200).json(leffa); // Send the 'leffa' object in the response body
  } catch (error) {
    res.status(500).json({
      message: 'Elokuvaa ei löytynyt.',
    });
  }
});

app.put('/leffat/:leffaID', (req, res) => {
  try {
    const id = parseInt(req.params.leffaID);
    let leffa = leffat.find((leffa) => leffa.id === id);
    if (!leffa) {
      return res.status(404).json({
        message: 'Elokuvaa ei löytynyt.',
      });
    }
    const leffaIDX = leffat.indexOf(leffa);
    leffat[leffaIDX].Director = req.body.Director || leffat[leffaIDX].Director;
    leffat[leffaIDX].Title = req.body.Title || leffat[leffaIDX].Title;
    res.status(200).json({
      message: 'Tietojen päivitys onnistui!',
      leffa,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Elokuvaa ei löytynyt.',
    });
  }
});

app.delete('/leffat/:leffaID', (req, res) => {
  try {
    const id = parseInt(req.params.leffaID);
    let leffaIDX = leffat.findIndex((leffa) => leffa.id === id);
    if (leffaIDX === -1) {
      res.status(404).json({
        message: 'Elokuvaa ei löytynyt.',
      });
    }
    leffat.splice(leffaIDX, 1);
    res.status(200).json({
      message: 'Elokuvan poistaminen onnistui!',
      leffat,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Elokuvan poistaminen epäonnistui.',
    });
  }
});

app.delete('/leffat', (req, res) => {
  try {
    leffat.splice(0, leffat.length);
    res.status(200).json({
      message: 'Kaikki elokuvat poistettu.',
      leffat,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Elokuvien poistaminen epäonnistui.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});