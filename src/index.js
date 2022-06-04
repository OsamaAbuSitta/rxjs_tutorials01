import {from, fromEvent, interval, Observable , of, timer} from 'rxjs';
//-------------------------------------------------------------------------------------
// Declaritive approach , Operators = Functions
// https://rxjs.dev/api

//01.interval_test()
function interval_test(){
    const observable =  interval(1000);

    console.log('Before');
    
    let subscriber = observable.subscribe(
        console.log
    );
   
    console.log('After')
}


//02.timer_test()
function timer_test(){
    const observable =  timer(0,1000);

    console.log('Before');
    
    let subscriber = observable.subscribe(
        console.log
    );
   
    console.log('After')
}


//03.fromEvent_test()
//fromEvent_test();
function fromEvent_test(){
    const observable =  fromEvent(
        document,
        'click'
    );

    console.log('Before');
    
    let subscriber = observable.subscribe((value)=>{
            console.log(value);
            subscriber.unsubscribe();
        }
    );
   
    console.log('After');
}

//04.of_test() is completely synchronous , will not flattening the array 
//of_test();
function of_test(){
    const observable =  of(1,2,3,4,5,[6,7,8]);

    console.log('Before');
    
    observable.subscribe({
        next:(value)=>{
            console.log(value);
        },
        complete: ()=>{
            console.log('complated')
        }
    });

      
    observable.subscribe({
        next:(value)=>{
            console.log(value);
        },
        complete: ()=>{
            console.log('complated')
        }
    });
   
    console.log('After');
}

//05.from_test() is completely asynchronous/synchronous based on the input , will flattening the array 
//from_test();
function from_test(){
    const observable =  from(fetch('https://jsonplaceholder.typicode.com/todos/1'));//from([1,2,3,4,5]);

    console.log('Before');
    
    observable.subscribe({
        next:(value)=>{
            console.log(value);
        },
        complete: ()=>{
            console.log('complated')
        }
    });

      
    observable.subscribe({
        next:(value)=>{
            console.log(value);
        },
        complete: ()=>{
            console.log('complated')
        }
    });
   
    console.log('After');
}

//** Pipeable operators : they are functions for transforming, filtering and combining data.
//06. map  -> 'rxjs/operators'
import {pipe,map,pluck ,filter,reduce,take,scan,tap} from 'rxjs/operators'
//map_test();

function map_test(){
    const observable = of(1,2,3,4,5,6,7,8,9).pipe(
        map(value=> {
            return `${value.toString()} $`;
        })
    );
    
    observable.subscribe(console.log);
}

//07. pluck get a specific property 
//pluck_test();

function pluck_test(){
    const observable = fromEvent(document,'keydown').pipe(
        pluck('code')
    );
    
    observable.subscribe(console.log);
}


//08. filter , filter value will keeping the observable active , 
//filter_test();

function filter_test(){
    const observable = fromEvent(document,'keydown').pipe(
        pluck('code'),
        filter((value)=> value === 'Space')
    );
    
    observable.subscribe(console.log);
}


//09. reduce
//reduce_test();
function reduce_test() {
    const observable = of(1,2,3,4,5,6,7,8,9).pipe(
        reduce((acc,current)=> {
            return acc += current ;
        },0)
    );
    
    observable.subscribe(console.log);
}


//09. take , complete the observable
//take_test();
function take_test() {
    const observable = interval(500).pipe(
        take(5),
        scan((acc,current)=> { // reduce
            return acc += current ;
        },0)
    );
    
    observable.subscribe(console.log);
}


//09. tab for debugging the stream
//tap_test();
function tap_test() {
    const observable = interval(500).pipe(
        take(5), 
        tap(console.log),
        reduce((acc,current)=> { 
            return acc += current ;
        },0)
    );
    
    observable.subscribe(console.log);
}


//10. flattening
import { ajax } from 'rxjs/ajax'; //for http requests , create operator not pipeable
import { mergeMap } from 'rxjs/operators'
//flattening_test();

function flattening_test() {
    const button = document.getElementById('btn');

    const observable2 = fromEvent(button,'click')
    .pipe(
        mergeMap(()=> interval(500).pipe(
                        tap(value=> {console.log(`tap valu ${value}`)}),
                        take(2)
                        )
            ),
        take(10)
    );
    
    observable2.subscribe(console.log);
    
    const observable = fromEvent(button,'click')
    .pipe(
        mergeMap(()=> {
             return ajax.getJSON('https://jsonplaceholder.typicode.com/users/1');
        })
    );
    
    observable.subscribe(console.log);
   
   /* 
   const observable = fromEvent(button,'click')
    .pipe(
        map(()=> {
             return ajax.getJSON('https://jsonplaceholder.typicode.com/users/1');
        })
       
    );
    
    observable.subscribe({
        next:(value) => {
            value.subscribe(result=> {
                console.log(result);
            })
        }
    });
    */
}

//11.switchMap limit the inner observable , single active observable , cancel the previous observable
import { switchMap } from 'rxjs';
//switchMap_test();

function switchMap_test() {
    const button = document.getElementById('btn');

    const observable = fromEvent(button,'click')
    .pipe(
        switchMap(()=> interval(500).pipe(
                        tap({
                           complete: ()=> {console.log("complate")}
                        }),
                        take(5)
                        )  
            ),
     
    );
    
    observable.subscribe(console.log);    
}

//11. Contact Map add the observables to a queue
import { concatMap } from 'rxjs';
concatMap_test();

function concatMap_test() {
    const button = document.getElementById('btn');

    const observable = fromEvent(button,'click')
    .pipe(
        concatMap(()=> interval(500).pipe(
                        tap({
                           complete: ()=> {console.log("complate")}
                        }),
                        take(5)
                        )  
            )     
    );
    
    observable.subscribe(console.log);    
}



//12. exhaustMap ignore 
import { exhaustMap } from 'rxjs';
exhaustMap_test();

function exhaustMap_test() {
    const button = document.getElementById('btn');

    const observable = fromEvent(button,'click')
    .pipe(
        exhaustMap(()=> interval(500).pipe(
                        tap({
                           complete: ()=> {console.log("complate")}
                        }),
                        take(5)
                        )  
            )     
    );
    
    observable.subscribe(console.log);    
}


// Summary 
/*
switchMap  - stop working on the previous observable and start working on the new one 
concatMap  - add the new observable to the queue
mergeMap   - working on all observables together 
exhaustMap - ignore the new request until finish the active observable
*/