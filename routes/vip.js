const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(vip_ar);
});
router.get('/single/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const vip = vip_ar.find(item => item.id === id);
    if (vip) {
        res.json(vip);
    } else {
        res.status(404).json({ message: 'VIP not found' });
    }
});

router.get('/search', (req, res) => {
    
   let searchQuery = req.query.s.toLocaleLowerCase();
   let filtered_vip = vip_ar.filter(vip => {
       return (vip.name.toLocaleLowerCase().includes(searchQuery))
       || (vip.source.toLocaleLowerCase().includes(searchQuery))
       || (vip.country.toLocaleLowerCase().includes(searchQuery));
   });
   res.json(filtered_vip);

});
module.exports = router;


const vip_ar = [
  {
  "name": "Bill Gates",
  "worth": "$124B",
  "birth_year": "1955",
  "source": "microsoft",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/59d502f931358e542c034e76/200x200.jpg?background=000000&cropX1=245&cropX2=2420&cropY1=636&cropY2=2813"
  },
  {
  "name": "Warren Buffett",
  "worth": "$96B",
  "birth_year": "1931",
  "source": "Berkshire Hathaway",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/59d5055931358e542c034ead/200x200.jpg?background=000000&cropX1=46&cropX2=693&cropY1=159&cropY2=806"
  },
  {
  "name": "Mark Zuckerberg",
  "worth": "$95B",
  "birth_year": "1984",
  "source": "Facebook",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/200x200.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044"
  },
  {
  "name": "Mark Zuckerberg123456",
  "worth": "$95B",
  "birth_year": "1984",
  "source": "Facebook",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/200x200.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044"
  },
  {
  "name": "Larry Ellison",
  "worth": "$93B",
  "birth_year": "1945",
  "source": "Sun, Oracle",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/59d5069b31358e542c034ec1/200x200.jpg?background=000000&cropX1=0&cropX2=2000&cropY1=227&cropY2=2228"
  },
  {
  "name": "Michael Bloomberg",
  "worth": "$59B",
  "birth_year": "1942",
  "source": "Facebook",
  "country": "USA",
  "image": "https://specials-images.forbesimg.com/imageserve/58c1d278a7ea431f321add1f/200x200.jpg?background=000000&cropX1=0&cropX2=744&cropY1=40&cropY2=784"
  }
  ];