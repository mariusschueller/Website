const matchups = new Array(19).fill(0);
let selected = [];
for (let i = 0; i < 18; i += 1) {
    selected.push(false);
}

// Normal Fire Water Electric Grass Ice Fighting Poison Ground Flying Psychic Bug Rock Ghost Dragon Dark Steel Fairy
// 0      1    2     3        4     5   6        7      8      9      10      11  12   13    14     15   16    17

function selectType(typeNum) {
    const strengthAndWeakness = new Array(19).fill(0);

    selected[typeNum] = !selected[typeNum];

    // set selected in each case
    switch(typeNum) {
        // Normal
        case 1:
            // add border to id
            if (selected[typeNum]){
                document.getElementById("normal").classList.add("selected");
            }

            else{
                document.getElementById("normal").classList.remove("selected");
            }
                
            strengthAndWeakness[6] = -1;
            strengthAndWeakness[13] = 1;
            break;

        // Fire
        case 2:
            if (selected[typeNum]){
                document.getElementById("fire").classList.add("selected");
            }

            else{
                document.getElementById("fire").classList.remove("selected");
            }

            strengthAndWeakness[8] = -1;
            strengthAndWeakness[12] = -1;
            strengthAndWeakness[2] = -1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[1] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[5] = 1;
            break;
    
        // Water
        case 3:
            if (selected[typeNum]){
                document.getElementById("water").classList.add("selected");
            }

            else{
                document.getElementById("water").classList.remove("selected");
            }

            strengthAndWeakness[4] = -1;
            strengthAndWeakness[3] = -1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[1] = 1;
            strengthAndWeakness[2] = 1;
            strengthAndWeakness[5] = 1;
            break;
        
        // Electric
        case 4:
            if (selected[typeNum]){
                document.getElementById("electric").classList.add("selected");
            }

            else{
                document.getElementById("electric").classList.remove("selected");
            }

            strengthAndWeakness[8] = -1;
            strengthAndWeakness[9] = 1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Grass
        case 5:
            if (selected[typeNum]){
                document.getElementById("grass").classList.add("selected");
            }

            else{
                document.getElementById("grass").classList.remove("selected");
            }

            strengthAndWeakness[9] = -1;
            strengthAndWeakness[7] = -1;
            strengthAndWeakness[11] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[5] = -1;
            strengthAndWeakness[8] = 1;
            strengthAndWeakness[2] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Ice
        case 6:
            if (selected[typeNum]){
                document.getElementById("ice").classList.add("selected");
            }

            else{
                document.getElementById("ice").classList.remove("selected");
            }

            strengthAndWeakness[6] = -1;
            strengthAndWeakness[12] = -1;
            strengthAndWeakness[16] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[5] = 1;
            break;
        
        // Fighting
        case 7:
            if (selected[typeNum]){
                document.getElementById("fighting").classList.add("selected");
            }

            else{
                document.getElementById("fighting").classList.remove("selected");
            }

            strengthAndWeakness[9] = -1;
            strengthAndWeakness[10] = -1;
            strengthAndWeakness[17] = -1;
            strengthAndWeakness[12] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[15] = 1;
            break;
        
        // Poison
        case 8:
            if (selected[typeNum]){
                document.getElementById("poison").classList.add("selected");
            }

            else{
                document.getElementById("poison").classList.remove("selected");
            }

            strengthAndWeakness[8] = -1;
            strengthAndWeakness[10] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[17] = 1;
            break;
        
        // Ground
        case 9:
            if (selected[typeNum]){
                document.getElementById("ground").classList.add("selected");
            }

            else{
                document.getElementById("ground").classList.remove("selected");
            }

            strengthAndWeakness[2] = -1;
            strengthAndWeakness[4] = -1;
            strengthAndWeakness[5] = -1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[12] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Flying
        case 10:
            if (selected[typeNum]){
                document.getElementById("flying").classList.add("selected");
            }

            else{
                document.getElementById("flying").classList.remove("selected");
            }

            strengthAndWeakness[12] = -1;
            strengthAndWeakness[3] = -1;
            strengthAndWeakness[5] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[8] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[4] = 1;
            break;
        
        // Psychic
        case 11:
            if (selected[typeNum]){
                document.getElementById("psychic").classList.add("selected");
            }

            else{
                document.getElementById("psychic").classList.remove("selected");
            }

            strengthAndWeakness[11] = -1;
            strengthAndWeakness[13] = -1;
            strengthAndWeakness[15] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[10] = 1;
            break;
        
        // Bug
        case 12:
            if (selected[typeNum]){
                document.getElementById("bug").classList.add("selected");
            }

            else{
                document.getElementById("bug").classList.remove("selected");
            }

            strengthAndWeakness[9] = -1;
            strengthAndWeakness[12] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[8] = 1;
            strengthAndWeakness[4] = 1;
            break;
        
        // Rock
        case 13:
            if (selected[typeNum]){
                document.getElementById("rock").classList.add("selected");
            }

            else{
                document.getElementById("rock").classList.remove("selected");
            }

            strengthAndWeakness[6] = -1;
            strengthAndWeakness[8] = -1;
            strengthAndWeakness[16] = -1;
            strengthAndWeakness[2] = -1;
            strengthAndWeakness[4] = -1;
            strengthAndWeakness[0] = 1;
            strengthAndWeakness[9] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[1] = 1;
            break;
        
        // Ghost
        case 14:
            if (selected[typeNum]){
                document.getElementById("ghost").classList.add("selected");
            }

            else{
                document.getElementById("ghost").classList.remove("selected");
            }

            strengthAndWeakness[13] = -1;
            strengthAndWeakness[15] = -1;
            strengthAndWeakness[0] = 1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[11] = 1;
            break;
        
        // Dragon
        case 15:
            if (selected[typeNum]){
                document.getElementById("dragon").classList.add("selected");
            }

            else{
                document.getElementById("dragon").classList.remove("selected");
            }

            strengthAndWeakness[5] = -1;
            strengthAndWeakness[14] = -1;
            strengthAndWeakness[17] = -1;
            strengthAndWeakness[1] = 1;
            strengthAndWeakness[2] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Dark
        case 16:
            if (selected[typeNum]){
                document.getElementById("dark").classList.add("selected");
            }

            else{
                document.getElementById("dark").classList.remove("selected");
            }

            strengthAndWeakness[6] = -1;
            strengthAndWeakness[11] = -1;
            strengthAndWeakness[17] = -1;
            strengthAndWeakness[13] = 1;
            strengthAndWeakness[10] = 1;
            strengthAndWeakness[15] = 1;
            break;
        
        // Steel
        case 17:
            if (selected[typeNum]){
                document.getElementById("steel").classList.add("selected");
            }

            else{
                document.getElementById("steel").classList.remove("selected");
            }

            strengthAndWeakness[6] = -1;
            strengthAndWeakness[8] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[0] = 1;
            strengthAndWeakness[9] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[12] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[10] = 1;
            strengthAndWeakness[5] = 1;
            strengthAndWeakness[14] = 1;
            strengthAndWeakness[17] = 1;
            break;
        
        // Fairy
        case 18:
            if (selected[typeNum]){
                document.getElementById("fairy").classList.add("selected");
            }

            else{
                document.getElementById("fairy").classList.remove("selected");
            }

            strengthAndWeakness[7] = -1;
            strengthAndWeakness[16] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[14] = 1;
            strengthAndWeakness[15] = 1;
            break;
    }

    const resistDiv = document.getElementById("resists");

    // Check if the div element exists
    if (resistDiv) {
        // Remove all child elements
        resistDiv.innerHTML = '';
    }

    const weakDiv = document.getElementById("weak");

    // Check if the div element exists
    if (weakDiv) {
        // Remove all child elements
        weakDiv.innerHTML = '';
    }

    for (let i = 0; i < matchups.length; ++i) {
        if (selected[typeNum])
            matchups[i] -= strengthAndWeakness[i];
        else
            matchups[i] += strengthAndWeakness[i];
        
        let matchupAmount = matchups[i];
        while (matchupAmount > 0){
            // add i check
            switch(i) {
                // Normal
                case 0:
                    addHtmlElement("normal", "weak");
                    break;
        
                // Fire
                case 1:
                    addHtmlElement("fire", "weak");
                    break;
            
                // Water
                case 2:
                    addHtmlElement("water", "weak");
                    break;
                
                // Electric
                case 3:
                    addHtmlElement("electric", "weak");
                    break;
                
                // Grass
                case 4:
                    addHtmlElement("grass", "weak");
                    break;
                
                // Ice
                case 5:
                    addHtmlElement("ice", "weak");
                    break;
                
                // Fighting
                case 6:
                    addHtmlElement("fighting", "weak");
                    break;
                
                // Poison
                case 7:
                    addHtmlElement("poison", "weak");
                    break;
                
                // Ground
                case 8:
                    addHtmlElement("ground", "weak");
                    break;
                
                // Flying
                case 9:
                    addHtmlElement("flying", "weak");
                    break;
                
                // Psychic
                case 10:
                    addHtmlElement("psychic", "weak");
                    break;
                
                // Bug
                case 11:
                    addHtmlElement("bug", "weak");
                    break;
                
                // Rock
                case 12:
                    addHtmlElement("rock", "weak");
                    break;
                
                // Ghost
                case 13:
                    addHtmlElement("ghost", "weak");
                    break;
                
                // Dragon
                case 14:
                    addHtmlElement("dragon", "weak");
                    break;
                
                // Dark
                case 15:
                    addHtmlElement("dark", "weak");
                    break;
                
                // Steel
                case 16:
                    addHtmlElement("steel", "weak");
                    break;
                
                // Fairy
                case 17:
                    addHtmlElement("fairy", "weak");
                    break;
            }
        
            matchupAmount -= 1;
        }

        
        while (matchupAmount < 0){
            // add i check
            switch(i) {
                // Normal
                case 0:
                    addHtmlElement("normal", "resists");
                    break;
        
                // Fire
                case 1:
                    addHtmlElement("fire", "resists");
                    break;
            
                // Water
                case 2:
                    addHtmlElement("water", "resists");
                    break;
                
                // Electric
                case 3:
                    addHtmlElement("electric", "resists");
                    break;
                
                // Grass
                case 4:
                    addHtmlElement("grass", "resists");
                    break;
                
                // Ice
                case 5:
                    addHtmlElement("ice", "resists");
                    break;
                
                // Fighting
                case 6:
                    addHtmlElement("fighting", "resists");
                    break;
                
                // Poison
                case 7:
                    addHtmlElement("poison", "resists");
                    break;
                
                // Ground
                case 8:
                    addHtmlElement("ground", "resists");
                    break;
                
                // Flying
                case 9:
                    addHtmlElement("flying", "resists");
                    break;
                
                // Psychic
                case 10:
                    addHtmlElement("psychic", "resists");
                    break;
                
                // Bug
                case 11:
                    addHtmlElement("bug", "resists");
                    break;
                
                // Rock
                case 12:
                    addHtmlElement("rock", "resists");
                    break;
                
                // Ghost
                case 13:
                    addHtmlElement("ghost", "resists");
                    break;
                
                // Dragon
                case 14:
                    addHtmlElement("dragon", "resists");
                    break;
                
                // Dark
                case 15:
                    addHtmlElement("dark", "resists");
                    break;
                
                // Steel
                case 16:
                    addHtmlElement("steel", "resists");
                    break;
                
                // Fairy
                case 17:
                    addHtmlElement("fairy", "resists");
                    break;
            }
            
            matchupAmount += 1;
        }
    }
    console.log(matchups);
}

// Function to add HTML element to the container
function addHtmlElement(typeId, containerId) {
    const container = document.getElementById(containerId); // Replace "containerId" with your actual container ID
    const div = document.createElement("div");
    div.className = "type " + typeId;
    div.innerHTML = `<span class="poketext">${typeId.charAt(0).toUpperCase() + typeId.slice(1)}</span>`;
    container.appendChild(div);
}