document.getElementById("loginForm").addEventListener("submit",async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    try{
        const res = await fetch("http://localhost:8080/api/users/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username,password}),
        });

        const data = await res.json();

        if(res.ok && data.success){
            window.location.href = "index.html";
        }
        else{
            alert(data.message || "Login failed");
        }
    }catch(err){
        console.error(err);
        alert("Something wrong");
    }
    
});

