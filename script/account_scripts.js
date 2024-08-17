let isPasswordIncorrect = false;
let data = {}


function buttonClickedOnLogin(element)
{
    data = {
        login: element[0].value,
        password: element[1].value
    }

    console.log("\tEntered data:")
    for (let key in data) {
        console.log(`${key}: ${data[key]}`);
    }
    for(let i = 0; i < element.length; i++)
    {
            element[i].value = '';
    }
}

function buttonClickedOnRegister(element)
{
    if(element[1].value !== element[2].value && !isPasswordIncorrect)
        {
            let err = document.createElement("err")
            err.id = 'error'
            err.innerHTML = "<br>Password incorrect"
            element[2].parentNode.insertBefore(err, element[2].nextSibling);
            isPasswordIncorrect = true
            console.error("[LOG] Incorrect password repeat")
            for(let i = 0; i < element.length; i++)
                {
                    element[i].value = ''
                }
        }
    else
    {
        isPasswordIncorrect = false;
        // Reg. info
        data={
            login: element[0].value,
            password: element[1].value
        }
        console.log("\tEntered data:")
        for (let key in data) {
            console.log(`${key}: ${data[key]}`);
        }
        
        for(let i = 0; i < element.length; i++)
        {
            element[i].value = '';
        }
    }
}   