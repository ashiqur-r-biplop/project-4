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
        // console.log(singleData)
        // access single data
        const {image, features, name, published_in , id} = singleData;
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
                    
                    <p><i class="fa-solid fa-calendar"></i> ${published_in}</p>
                </div>
                <i class="fa-solid fa-arrow-right" onclick="loadModal('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
              </div>
            </div>
          </div>
        `
        cardContainer.appendChild(div)
    });
    // spinner
    toggleSpinner(false)
}
// modal start
const loadModal =async (id) =>{
    // console.log(id)
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    try{
        const res = await fetch(URL)
        const data =  await res.json()
        displayModal(data.data)
    }
    catch{
        return;
    }
}
// display modal 
const displayModal = (singleData) =>{
    console.log(singleData.pricing)
    const modalBody = document.getElementById('modal-body');
    // modalBody.style.width = '200px';
    modalBody.innerHTML = `
    <div class="col">
        <div class="card p-3 left-card">
            <h6>${singleData.description}</h6>
            <div class="d-flex">
                <div class="text-center">
                <p class="m-0">${singleData.pricing[0].price}</p>
                <p class="m-0">${singleData.pricing[0].plan}</p>
                </div>
            </div>
        </div>
   </div>
   <div class="col">
        <div class="card p-3 text-center">
        <img src ="${singleData.image_link[0]}" class="img-fluid">
        <h6>${singleData.input_output_examples ? singleData.input_output_examples[0].input : 'No! Not Yet! Take a break!!!'}</h6>
        <p>${singleData.input_output_examples ? singleData.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
        </div>
   </div>
        
    `
}

// spinner
const toggleSpinner =(isSpinner) =>{
    const spinner =  document.getElementById('spinner')
    if(isSpinner === true){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }

}

// sellAll Btn
document.getElementById('SeeAll-Btn').addEventListener('click', function(){
    loadData()
    toggleSpinner(true);
})

// spinner 
toggleSpinner(true);
// load data
loadData(6)