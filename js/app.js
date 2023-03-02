// load data
const loadData = async (dataLimit) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL)
    const data = await res.json()
    displayData(data.data.tools, dataLimit)
}
// display data
const displayData = (arrayOfData, dataLimit) =>{
    const SeeAllBtn = document.getElementById('SeeAll-Btn');
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent ='';
    // condition out of 6 persons array length
    if(dataLimit && arrayOfData.length > 6){
        arrayOfData = arrayOfData.slice(0, 6);
        SeeAllBtn.classList.remove('d-none');
        SeeAllBtn.style.margin = '10px 0px';
    }
    else{
        SeeAllBtn.classList.add('d-none');
    }

    arrayOfData.forEach( singleData => {
        console.log(singleData)
        // access single data
        const {image, features, name, published_in} = singleData
        // destructuring in object
        const div = document.createElement('div');
        // apply card to dynamic
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="img-fluid card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <p class="card-text m-0">2.${features[1]}</p>
              <p class="card-text m-0">3.${features[2]}</p>
              <p class="card-text m-0">1.${features[0]}</p>
              <hr class="my-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h4>${name}</h4>
                    <p>${published_in}</p>
                </div>
                <i class="fa-solid fa-arrow-right"></i>
              </div>

              
            </div>
          </div>
        `
        cardContainer.appendChild(div)
    });
}




// sellAll Btn
document.getElementById('SeeAll-Btn').addEventListener('click', function(){
    loadData()
})

// load data
loadData(6)