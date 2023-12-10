
const austria = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','65');
        return 65;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','83');
        return 83;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','94');
        return 94;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','107');
        return 107;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','127');
        return 125;
    }
}


const americas = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','43');
        return 43;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','55');
        return 55;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','68');
        return 68;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','79');
        return 79;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','93');
        return 93;
    }
}


const africas = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','48');
        return 48;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','60');
        return 60;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','70');
        return 73;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','85');
        return 85;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','98');
        return 98;
    }
}


const europe = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','47');
        return 47;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','62');
        return 62;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','70');
        return 70;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','83');
        return 83;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','97');
        return 97;
    }
}

const uae = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','56');
        return 56;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','72');
        return 72;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','83');
        return 83;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','98');
        return 98;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','112');
        return 112;
    }
}

const uk = (totalWeight)=>{
    if(totalWeight > 0 && totalWeight <= 2){
        localStorage.setItem('del_fee','35');
        return 35;
    }else if( totalWeight > 2 && totalWeight <= 2.5 ){
        localStorage.setItem('del_fee','46');
        return 46;
    }else if(totalWeight > 2.5 && totalWeight <= 3){
        localStorage.setItem('del_fee','54');
        return 54;
    }else if(totalWeight > 3 && totalWeight <= 3.5){
        localStorage.setItem('del_fee','61');
        return 61;
    }else if(totalWeight > 3.5 && totalWeight <= 4) {
        localStorage.setItem('del_fee','69');
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