refs={form:document.querySelector("form"),delayInput:document.querySelector('[name="delay"]'),stepInput:document.querySelector('[name="step"]'),amountInput:document.querySelector('[name="amount"]')},refs.form.addEventListener("submit",(function(u){u.preventDefault(),t=Number(refs.amountInput.value);for(let u=0;u<t;u+=1)n=Number(refs.stepInput.value),o(t,e).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)})),e+=n}));let e=null,t=null,n=null;function o(t,n){return e=Number(refs.delayInput.value),new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:t,delay:e}):o({position:t,delay:e})}),e)}))}
//# sourceMappingURL=03-promises.fffc495c.js.map
