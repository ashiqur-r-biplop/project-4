let obj 
// load data
const loadData = async (dataLimit) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL)
    const data = await res.json()
    displayData(data.data.tools, dataLimit)
    obj = data.data.tools;
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
        // access single data
        // destructuring in object
        const {image, features, name, published_in , id} = singleData;
        const div = document.createElement('div');
        // apply card to dynamic
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="img-fluid card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol typeof= "1">
              ${features[0] ?  `<li>${features[0]}</li>`  : ''}
              ${features[1] ?  `<li>${features[1]}</li>`  : ''}
              ${features[2] ?  `<li>${features[2]}</li>`  : ''}
              ${features[3] ?  `<li>${features[3]}</li>`  : ''}
              </ol>
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
    toggleSpinner(false);
}
// modal start
const loadModal = async (id) =>{
    // console.log(id)
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        const res = await fetch(URL)
        const data =  await res.json()
        displayModal(data.data)
}
// display modal 
const displayModal = (singleData) =>{
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="col  mt-2">
        <div class="card p-3 modal-col left-card">
            <h6>${singleData.description}</h6>
            <div class="button-group-flex d-flex justify-content-between align-items-center w-100">
                <div class="text-center button-group text-success fw-bold modal-amount-btn">
                ${(singleData.pricing !== null && singleData.pricing[0].price.includes('month')) ? `<p class="m-0">${singleData.pricing[0].price}</p>` : 'Free of Cost/'}
                ${(singleData.pricing !== null && typeof singleData.pricing[0].plan === 'string') ? `<p class="m-0">${singleData.pricing[0].plan}</p>` : `Basic`}
                </div>
                <div class="text-center button-group text-warning-emphasis fw-bold modal-amount-btn">
                ${(singleData.pricing !== null && singleData.pricing[1].price.includes('month')) ? `<p class="m-0">${singleData.pricing[1].price}</p>` : 'Free of Cost/'}
                ${(singleData.pricing !== null && typeof singleData.pricing[1].plan === 'string') ? `<p class="m-0">${singleData.pricing[1].plan}</p>` : `Pro`}
                </div>
                <div class="text-center button-group text-danger fw-bold modal-amount-btn">
                ${(singleData.pricing !== null &&  singleData.pricing[2]) ? `<p class="m-0">${singleData.pricing[2].price.slice(0,10)}</p>` : 'Free of Cost/'}
                ${(singleData.pricing !== null &&  singleData.pricing[2].plan ) ? `<p class="m-0">${singleData.pricing[2].plan}</p>` : `Enterprise`}
                </div>
            </div>
            <div class="row  justify-content-between w-100 mx-auto">
                <div class="mt-4 col-lg-6">
                    <h5>Features</h5>
                 ${singleData.features[1].feature_name ? `<li>${singleData.features[1].feature_name}</li>` : ''}
                 ${singleData.features[2].feature_name ? `<li>${singleData.features[2].feature_name}</li>` : ''}
                 ${singleData.features[3].feature_name ? `<li>${singleData.features[3].feature_name}</li>` : '<p class="m-0">-No data Found</p>'}
                </div>
                <div class="mt-4 col-lg-6">
                    <h5>Integrations</h5>
                    ${(singleData.integrations !== null && singleData.integrations[0]) ? `<li>${singleData.integrations[0]}</li>` : ''}
                    ${singleData.integrations !== null && singleData.integrations[1] ? `<li>${singleData.integrations[1]}</li>` : ''}
                    ${singleData.integrations !== null && singleData.integrations[2] ? `<li>${singleData.integrations[2]}</li>` : '<p class="m-0">-No data Found</p>'}
                </div>
            </div>
        </div>
   </div>
   <div class="col mt-2">
        <div class="card p-3  modal-col text-center ">
            <div class="modal-image-box">
                <img src ="${singleData.image_link[0]}" class="img-fluid">
                ${(singleData.accuracy.score !== null ) ? `<button>${Math.floor(singleData.accuracy.score * 100)}% accuracy</button>` : ''}
            </div>
            <div class="mt-2">
            <h6>${singleData.input_output_examples !== null ? singleData.input_output_examples[0].input : 'Can you give any example?'}</h6>
            <p> ${singleData.input_output_examples !== null ? singleData.input_output_examples[0].output.slice(0,100) : 'No! Not Yet! Take a break!!!'}...</p>
            </div>
        </div>
   </div>
    `
}
// sortData 
function sortByDate(data) {
    data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    displayData(data);
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
// sortBtn
document.getElementById('sortBtn').addEventListener('click', function(){
    toggleSpinner(true)
    sortByDate(obj);
})
// sellAll Btn
document.getElementById('SeeAll-Btn').addEventListener('click', function(){
    loadData()
})
// spinner 
toggleSpinner(true);
// load data
loadData(6)