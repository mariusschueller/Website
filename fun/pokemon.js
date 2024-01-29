const matchups = new Array(19).fill(0);

// Normal Fire Water Electric Grass Ice Fighting Poison Ground Flying Psychic Bug Rock Ghost Dragon Dark Steel Fairy
// 0      1    2     3        4     5   6        7      8      9      10      11  12   13    14     15   16    17

function selectType(typeNum) {
    const strengthAndWeakness = new Array(19).fill(0);

    // set selected in each case
    switch(typeNum) {
        // Normal
        case 1:
            strengthAndWeakness[6] = -1;  // vulnerable to fighting
            strengthAndWeakness[13] = 1;  // resistant to ghost
            break;

        // Fire
        case 2:
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
            strengthAndWeakness[4] = -1;
            strengthAndWeakness[3] = -1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[1] = 1;
            strengthAndWeakness[2] = 1;
            strengthAndWeakness[5] = 1;
            break;
        
        // Electric
        case 4:
            strengthAndWeakness[8] = -1;
            strengthAndWeakness[9] = 1;
            strengthAndWeakness[16] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Grass
        case 5:
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
            strengthAndWeakness[6] = -1;
            strengthAndWeakness[12] = -1;
            strengthAndWeakness[16] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[5] = 1;
            break;
        
        // Fighting
        case 7:
            strengthAndWeakness[9] = -1;
            strengthAndWeakness[10] = -1;
            strengthAndWeakness[17] = -1;
            strengthAndWeakness[12] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[15] = 1;
            break;
        
        // Poison
        case 8:
            strengthAndWeakness[8] = -1;
            strengthAndWeakness[10] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[4] = 1;
            strengthAndWeakness[17] = 1;
            break;
        
        // Ground
        case 9:
            strengthAndWeakness[2] = -1;
            strengthAndWeakness[4] = -1;
            strengthAndWeakness[5] = -1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[12] = 1;
            strengthAndWeakness[3] = 1;
            break;
        
        // Flying
        case 10:
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
            strengthAndWeakness[11] = -1;
            strengthAndWeakness[13] = -1;
            strengthAndWeakness[15] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[10] = 1;
            break;
        
        // Bug
        case 12:
            strengthAndWeakness[9] = -1;
            strengthAndWeakness[12] = -1;
            strengthAndWeakness[1] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[8] = 1;
            strengthAndWeakness[4] = 1;
            break;
        
        // Rock
        case 13:
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
            strengthAndWeakness[13] = -1;
            strengthAndWeakness[15] = -1;
            strengthAndWeakness[0] = 1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[7] = 1;
            strengthAndWeakness[11] = 1;
            break;
        
        // Dragon
        case 15:
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
            strengthAndWeakness[6] = -1;
            strengthAndWeakness[11] = -1;
            strengthAndWeakness[17] = -1;
            strengthAndWeakness[13] = 1;
            strengthAndWeakness[10] = 1;
            strengthAndWeakness[15] = 1;
            break;
        
        // Steel
        case 17:
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
            strengthAndWeakness[7] = -1;
            strengthAndWeakness[16] = -1;
            strengthAndWeakness[6] = 1;
            strengthAndWeakness[11] = 1;
            strengthAndWeakness[14] = 1;
            strengthAndWeakness[15] = 1;
            break;
    }

    for (let i = 0; i < typeNum.length; ++i) {
        /* if ()
            matchups[i] += strengthAndWeakness[i];
        else
            matchups[i] -= strengthAndWeakness[i];*/
    }
}