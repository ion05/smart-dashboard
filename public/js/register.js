const dashboard = document.querySelector(".dashboard-register");
const modelDiv = document.createElement("div");
modelDiv.classList.add("dashboard-model-div");
dashboard.appendChild(modelDiv);
modelDiv.innerHTML = `
    <h2>Get Started</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, mintam sed dolores? Odit, architecto ducimus!</p>
    <div class="row">
        <div class="col-sm-4">
            <div class="card">
                <span class="material-icons-outlined">
                    person_add_alt
                </span>
                <h4>Create Account</h4>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
        <div class="col-sm-5">
            <div class="car-register-div">
                <form action="/register" method="POST">
                    <input required="true" type="email" name="email" id="email" placeholder="Email">
                    <input required="true" type="username" name="username" id="username" placeholder="username">
                    <input required="true" type="password" name="password" id="password" placeholder="Password">
                    <input required="true" type="text" name="modelNumber" id="modelNumber" placeholder="Model Number">
                    <input required="true" type="text" name="emergencyContact" id="emergencyContact" placeholder="Emergency Contact">
                    <button type="submit" class="register">Register</button>
                </form>
            </div>
        </div>
    </div>
`;
