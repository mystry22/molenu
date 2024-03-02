
const austria = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 65;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 83;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 94;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 107;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 125;
    }
}


const americas = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 43;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 55;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 68;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 79;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 93;
    }
}


const africas = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 48;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 60;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 73;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 85;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 98;
    }
}


const europe = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 47;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 62;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 70;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 83;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 97;
    }
}

const uae = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 56;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 72;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 83;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 98;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 112;
    }
}

const uk = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','0');
        return 35;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','0');
        return 46;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','0');
        return 54;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','0');
        return 61;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','0');
        return 69;
    }
}




export{
    austria,
    americas,
    africas,
    europe,
    uae,
    uk
}