const dashboard = document.querySelector(".dashboard-login");
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
                    login
                </span>
                <h4>Create Account</h4>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
        <div class="col-sm-5">
            <div class="car-register-div">
                <form action="/login" method="POST">
                    <input required="true" type="email" name="email" id="email" placeholder="Email">
                    <input required="true" type="password" name="password" id="password" placeholder="Password">
                    <button type="submit" class="register">Login</button>
                </form>
            </div>
        </div>
    </div>
`;
