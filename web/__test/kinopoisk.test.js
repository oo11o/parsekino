const path = require('path');
const fs = require('fs').promises;

const Kinopoisk = require('../utils/Kinopoisk.js');

const nameFixture = {
  'list-many-page'    : "list-many-page.html",
  'list-one-page'     : "list-one-page.html",
  'list-two-page'     : "list-two-page.html",
  'list-without-page' : "list-without-page.html",
  'list-zero-page'    : "list-zero-page.html",
  'untarget-page'     : "untarget-page.html",
}


const readFile = async (filename) => {
   const getFixturePath = (name) => path.join(__dirname, 'fixture', name);
   return await fs.readFile(getFixturePath(filename));
}

const fakeGetHtml = async () => {
   return await readFile(nameFixture['list-many-page']); 
}
const fakeGetZeroHtml = async () => {
  return await readFile(nameFixture['list-zero-page']); 
}
const fakeGetOnePageHtml = async () => {
  return await readFile(nameFixture['list-one-page']);
}

const fakeGetUntargetHtml = async () => {
  return await readFile(nameFixture['untarget-page']);
}

const fakeGetTwoPageHtml = async () => {
  return await readFile(nameFixture['list-two-page']);
}


describe("Get Count Movies:", () => {
  test('it should be return count', async() => {
    const kinopoisk = new Kinopoisk(fakeGetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountMovie()).toEqual(9133);
  });

  test('it should be return zero', async() => {
    const kinopoisk = new Kinopoisk(fakeGetZeroHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountMovie()).toEqual(0);
  })
  
  test('it should be return false', async() => {
    const kinopoisk = new Kinopoisk(fakeGetUntargetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountMovie()).toEqual(false);
  })
});


describe("Get PAGE Count:", () => {
  test('it should be return count 183', async() => {
    const kinopoisk = new Kinopoisk(fakeGetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountPage()).toEqual(183);
  });

  test('it should be return 2', async() => {
    const kinopoisk = new Kinopoisk(fakeGetTwoPageHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountPage()).toEqual(2);
  })

  test('it should be return 1', async() => {
    const kinopoisk = new Kinopoisk(fakeGetZeroHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountPage()).toEqual(1);
  })
  
  test('it should be return false', async() => {
    const kinopoisk = new Kinopoisk(fakeGetUntargetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getCountPage()).toEqual(false);
  })
});

describe("Get List Movies:", () => {
  test('it should be return 50 movies', async () => {
    const kinopoisk = new Kinopoisk(fakeGetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getListMovies().length).toEqual(50);
  });

  test('it should be return movies data', async () => {
    const kinopoisk = new Kinopoisk(fakeGetHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getListMovies()[49]).toEqual( {"kinopoisk_id": 716462, "kinopoisk_url": "/film/716462/"});
  });

  test('it should be empty array', async() => {
    const kinopoisk = new Kinopoisk(fakeGetZeroHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getListMovies()).toEqual([]);
  })

  test('it should be the data of the sixth movie ', async() => {
    const kinopoisk = new Kinopoisk(fakeGetOnePageHtml);
    await kinopoisk._buildDom();
    expect(kinopoisk._getListMovies().length).toEqual(9);
    expect(kinopoisk._getListMovies()[6]).toEqual({"kinopoisk_id": 214437, "kinopoisk_url": "/film/214437/"});
  })

});





// const fakeGetMovieHtml = async (url = '') => {
//    return await readFile(nameFixture['list-many-page']); 
// }

// const fakeGetZeroMovieHtml = async (url = '') => {
//   return await readFile(nameFixture['list-zero-page']); 
// }

// const fakeGetUntargeHtml = async (url = '') => {
//   return await readFile(nameFixture['untarget-page']); 
// }



// const kinopoisk = new Kinopoisk(fakeGetMovieHtml); //getHtml(url)
// const url = 'https://www.kinopoisk.ru/lists/movies/year--2000/';




// beforeEach( async() => {
//   await kinopoisk.setUrl(url)
// });


// describe("Set Page, Get Dom:", () => {
//   test('it should be return url', async() => {
//     expect(kinopoisk.getUrl()).toEqual(url);
//   })

//   test('it should be dom', async() => {
//     await kinopoisk._buildDom();
//     const elHtml = kinopoisk.dom.window.document.querySelector('body');
//     expect(elHtml).not.toBeNull();
//   })
// });


// describe("Get Data Page Full Page", () => {
//   test("it should be total count page", async () => {
//     const data = await kinopoisk.getDataPageMovie();
//       expect(data).toEqual(
//         {
//           'countMovie': 9133,
//         }); 
//       });
// });


// describe("Get Data Page Zero Page", () => {
//   test("it should be zero count page", async () => {
//     const kinopoiskZero = new Kinopoisk(fakeGetZeroMovieHtml);
//     kinopoiskZero.url = url;
//     const data = await kinopoiskZero.getDataPageMovie();
//     expect(data).toEqual(
//       {
//         'countMovie': 0,
//       }); 
//     });
// });

// describe("Untarget Page", () => {
//   test("it should be untarget information", async () => {
//     const kinopoiskZero = new Kinopoisk(fakeGetUntargeHtml);
//     kinopoiskZero.url = url;
//     const data = await kinopoiskZero.getDataPageMovie();
//     expect(data).toEqual(
//       {
//         'countMovie': 0,
//       }); 
//     });
// });



