let before = {
    'Ice': 'Cream',
    'Age': '21',
    'Light': 'Cream',
    'Double': 'Cream'
}
let before2 = {
    'Ice': 'Cream',
    'Heavy': 'Cream',
    'Light': 'Cream',
    'Double': 'Cream'
}
function returnNewObj (dic){
    const newDic = {}
    for(const key in dic){
        if(dic[key] in newDic){
            newDic[dic[key]] = [...newDic[dic[key]], key]
        }else {
            newDic[dic[key]] = [key]
        }

    }
    console.log(newDic)
}
returnNewObj(before)