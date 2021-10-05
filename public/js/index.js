const startBtn = document.querySelector(".start");
const displayWelcome = document.querySelector(".welcome");
const languageDiv = document.createElement("div");
languageDiv.classList.add("dashboard-language-div");
const dashboard = document.querySelector(".dashboard-welcome-div");
dashboard.appendChild(languageDiv);
languageDiv.innerHTML = `
    <h2>Personalize.</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, mintam sed dolores? Odit, architecto ducimus!</p>
    <div class="row">
        <div class="col-sm-4">
            <div class="card">
                <span class="material-icons-outlined">
                    public
                </span>
                <h4>Region</h4>
                <h2>India</h2>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <span class="material-icons-outlined">
                    g_translate
                </span>
                <h4>Language</h4>
                <h2>English</h2>
            </div>
        </div>
    </div>
    <button class='btn next'>Next </button>
`;
// const modelDiv = document.createElement('div');
// modelDiv.classList.add('dashboard-model-div');
// dashboard.appendChild(modelDiv);
// modelDiv.innerHTML = `
//     <h2>Get Started</h2>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, mintam sed dolores? Odit, architecto ducimus!</p>
//     <div class="row">
//         <div class="col-sm-4">
//             <div class="card">
//                 <span class="material-icons-outlined">
//                     person_add_alt
//                 </span>
//                 <h4>Create Account</h4>
//                 <p>Already have an account? <a href="#">Login</a></p>
//             </div>
//         </div>
//         <div class="col-sm-5">
//             <div class="car-register-div">
//                 <div class="legend-div">
//                     <legend>Model No.</legend>
//                     <legend>Email</legend>
//                     <legend>Password</legend>
//                     <input type="text" class="model-input"></input>
//                     <input type="text" class="pw-input"></input>
//                     <input type="text" class="email-input"></input>
//                     <span class="material-icons-outlined car-icon">
//                         directions_car
//                     </span>
//                     <span class="material-icons-outlined email-icon">
//                         email
//                     </span>
//                     <span class="material-icons-outlined lock-icon">
//                         lock
//                     </span>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <button class="btn next-1">Next</button>
//     <button class="btn back-1">Back</button>
// `;
const featureDiv = document.createElement("div");
featureDiv.classList.add("dashboard-feature-div");
featureDiv.innerHTML = `
    <h2>It's all yours</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, mintam sed dolores? Odit, architecto ducimus!</p>
    <div class="row">
        <ul class="ft-icon">
            <li>
                <span class="material-icons-outlined">
                    fingerprint
                </span>
            </li>
            <li>
                <span class="material-icons-outlined">
                     call
                </span>
            </li>
            <li>
                <span class="material-icons-outlined">
                    audiotrack
                </span>
            </li>
        </ul>
        <ul class="ft-desc">
            <li>
                <b>Fingerprint Authentication</b>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing <br>
                elit. Eos, mintam sed dolores? Odit, architecto ducimus!
                </p>
            </li>
            <li>
                <b>Emergency Contact</b>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing <br>
                elit. Eos, mintam sed dolores? Odit, architecto ducimus!
                </p>
            </li>
            <li>
                <b>Ease Of Access to Music, Calendar,Navigation, etc.</b>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing <br>
                elit. Eos, mintam sed dolores? Odit, architecto ducimus!
                </p>
            </li>
        </ul>
    </div>
    <button class="btn next-2" >Next</button>
    <button class="btn back-2">Back </button>
    `;
dashboard.appendChild(featureDiv);
const [nextLanguageBtn, nextFeatureBtn] = [
  document.querySelector(".next"),
  document.querySelector(".next-2"),
];
const [backBtn, backBtn1] = [
  document.querySelector(".back-1"),
  document.querySelector(".back-2"),
];
startBtn.addEventListener("click", () => {
  displayWelcome.style.display = "none";
  languageDiv.style.display = "block";
  languageDiv.style.animation = "leftTransition 2s 0.5s ease;";
  languageDiv.style.transition = "all 1s ease";
});
// backBtn.addEventListener('click',()=>{
//     languageDiv.style.display='block';
//     modelDiv.style.display='none';
// })
// backBtn1.addEventListener('click', ()=>{
//     modelDiv.style.display='block';
//     featureDiv.style.display='none';
// })
nextLanguageBtn.addEventListener("click", () => {
  languageDiv.style.display = "none";
  featureDiv.style.display = "block";
});
backBtn1.addEventListener("click", () => {
  languageDiv.style.display = "none";
  featureDiv.style.display = "none";
});
nextFeatureBtn.addEventListener("click", () => {
  window.location.href = "/register";
});
