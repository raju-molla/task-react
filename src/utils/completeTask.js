export const completeTask  = (data) => {
    console.log("data->",data);
    const completeTask = data.filter(ele=>ele.isComplete==true);
    return completeTask.length;
}