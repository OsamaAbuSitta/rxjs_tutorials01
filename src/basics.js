

//-------------------------------------------------------------------------------------
// Declaritive vs Imperitice programming 
/*
 Imperative programming focuses on the HOW whereas declaritive programming focuses on the WHAT 
 in imperative we give the instruction to how we need to achive the result 
 in declaritive we interst on the result it self 
 the below conseder as Imperative 

 Underneath declartive programming in an imperative abstraction.

 */
/*
const observable = new Observable((subscriber)=>{
    
   var id =  setInterval(()=> {
        subscriber.next('data');
        console.log('leak');     
    },1000);
   

   return ()=> {
       clearInterval(id);
   }

});

console.log('Before');

let subscriber = observable.subscribe({
    next : (value) => {  console.log(value)},
    complete: ()=>{ console.log('completed')},
    error: (err)=>{ console.error(err)},
});

setInterval(()=> {
    subscriber.unsubscribe();
},3000)

console.log('After')
*/


//-------------------------------------------------------------------------------------
/*  observable complate , unsubscribe and leak 

const observable = new Observable((subscriber)=>{
    
   var id =  setInterval(()=> {
        subscriber.next('data');
        console.log('leak');     
    },1000);
   

   return ()=> {
       clearInterval(id);
   }

});

console.log('Before');

let subscriber = observable.subscribe({
    next : (value) => {  console.log(value)},
    complete: ()=>{ console.log('completed')},
    error: (err)=>{ console.error(err)},
});

setInterval(()=> {
    subscriber.unsubscribe();
},3000)



console.log('After')



*/