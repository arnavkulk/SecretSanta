(this["webpackJsonpsecret-santa-website"]=this["webpackJsonpsecret-santa-website"]||[]).push([[0],{62:function(e,t,r){"use strict";r.r(t);var n=r(2),c=r(1),a=r.n(c),s=r(25),i=r.n(s),j=r(13),l=r.n(j),o=r(20),d=r(10),u=r(81),b=r(79),O=r(80),x=r(76),h=r(9),p=r(15),m=r(40);r(52),r(63);r(41).config();var f=m.a.initializeApp({apiKey:"AIzaSyDYdwZc1XvhmTedGOB2ALV1D6HjzqeQfrw",authDomain:"secrets-91dd7.firebaseapp.com",projectId:"secrets-91dd7",storageBucket:"secrets-91dd7.appspot.com",messagingSenderId:"200284184264",appId:"1:200284184264:web:8ef308bb269c0f86850ffd",measurementId:"G-E2E3V7T4FJ"}),v=f.auth(),g=f.firestore();function w(e,t){return v.createUserWithEmailAndPassword(e,t)}function y(e,t){return v.signInWithEmailAndPassword(e,t)}function k(){return v.signOut()}function N(e){return v.sendPasswordResetEmail(e)}function S(e,t){return g.collection("users").doc(e).set(t)}function C(e,t){return g.collection("users").doc(e).update(t)}function D(e){return g.collection("users").doc(e).get()}function P(){return g.collection("commands").doc("commandCenter").update({state:"started"})}function F(){return L.apply(this,arguments)}function L(){return(L=Object(o.a)(l.a.mark((function e(){var t,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.collection("commands").doc("commandCenter").update({state:"not started"});case 2:return e.next=4,g.collection("users").get();case 4:return t=e.sent,r=[],t.docs.forEach((function(e){r.push(e.ref.update({person:"",personDesire:"",personDislike:""}))})),e.next=9,Promise.all(r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),r=Object(c.useRef)(null),a=Object(c.useRef)(null),s=Object(c.useRef)(null),i=Object(c.useRef)(null),j=Object(c.useState)(""),m=Object(d.a)(j,2),f=m[0],v=m[1],g=Object(c.useState)(!1),y=Object(d.a)(g,2),k=y[0],N=y[1],C=Object(h.g)();function D(){return(D=Object(o.a)(l.a.mark((function n(c){var j,o,d,u,b,O,x,h,p,m;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),(null===(j=r.current)||void 0===j?void 0:j.value)===(null===(o=a.current)||void 0===o?void 0:o.value)){n.next=3;break}return n.abrupt("return",v("Passwords do not match"));case 3:return n.prev=3,v(""),N(!0),n.next=8,w(null===(d=t.current)||void 0===d?void 0:d.value,null===(u=r.current)||void 0===u?void 0:u.value);case 8:if((p=n.sent).user){n.next=12;break}return v("Failed to create an account"),n.abrupt("return");case 12:return m={email:null===(b=t.current)||void 0===b?void 0:b.value,name:null===(O=e.current)||void 0===O?void 0:O.value,desire:null===(x=s.current)||void 0===x?void 0:x.value,dislike:null===(h=i.current)||void 0===h?void 0:h.value,userType:"user",personDesire:"",personDislike:"",person:""},n.next=15,S(p.user.uid,m);case 15:C.push("/"),n.next=21;break;case 18:n.prev=18,n.t0=n.catch(3),""===n.t0&&v("Failed to create an account");case 21:N(!1);case 22:case"end":return n.stop()}}),n,null,[[3,18]])})))).apply(this,arguments)}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Sign Up"}),f&&Object(n.jsx)(b.a,{variant:"danger",children:f}),Object(n.jsxs)(O.a,{onSubmit:function(e){return D.apply(this,arguments)},children:[Object(n.jsxs)(O.a.Group,{id:"name",children:[Object(n.jsx)(O.a.Label,{children:"Name"}),Object(n.jsx)(O.a.Control,{type:"text",ref:e,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"email",children:[Object(n.jsx)(O.a.Label,{children:"Email"}),Object(n.jsx)(O.a.Control,{type:"email",ref:t,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"password",children:[Object(n.jsx)(O.a.Label,{children:"Password"}),Object(n.jsx)(O.a.Control,{type:"password",ref:r,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"password-confirm",children:[Object(n.jsx)(O.a.Label,{children:"Password Confirmation"}),Object(n.jsx)(O.a.Control,{type:"password",ref:a,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"want",children:[Object(n.jsx)(O.a.Label,{children:"What you want"}),Object(n.jsx)(O.a.Control,{type:"text",ref:s,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"dontwant",children:[Object(n.jsx)(O.a.Label,{children:"What you don't Want"}),Object(n.jsx)(O.a.Control,{type:"text",ref:i,required:!0})]}),Object(n.jsx)(x.a,{disabled:k,className:"w-100",type:"submit",children:"Sign Up"})]})]})}),Object(n.jsxs)("div",{className:"w-100 text-center mt-2",children:["Already have an account? ",Object(n.jsx)(p.b,{to:"/login",children:"Log In"})]})]})}var R=r(77),G=Object(c.createContext)({currentUser:null}),U=function(){return Object(c.useContext)(G)},q=function(e){var t=e.children,r=Object(c.useState)(null),a=Object(d.a)(r,2),s=a[0],i=a[1],j=Object(c.useState)(!0),l=Object(d.a)(j,2),o=l[0],u=l[1];Object(c.useEffect)((function(){return v.onAuthStateChanged((function(e){i(e),u(!1)}))}),[]);var b={currentUser:s};return Object(n.jsxs)(G.Provider,{value:b,children:[" ",!o&&t]})},I=r(78);function B(){var e=Object(c.useState)(""),t=Object(d.a)(e,2),r=t[0],a=t[1],s=Object(c.useState)({name:"",desire:"",email:"",dislike:"",personDesire:"",personDislike:""}),i=Object(d.a)(s,2),j=i[0],O=i[1],m=Object(c.useState)("not started"),f=Object(d.a)(m,2),v=f[0],w=f[1],y=U().currentUser,N=Object(h.g)();function S(){return C.apply(this,arguments)}function C(){return(C=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(""),e.prev=1,e.next=4,k();case 4:N.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),a("Failed to log out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){y&&D(y.uid).then((function(e){O(e.data())}))}),[y,j]),Object(c.useEffect)((function(){var e,t;e="commands/commandCenter",t=function(e){var t;w(null===(t=e.data())||void 0===t?void 0:t.state)},g.doc(e).onSnapshot(t)}),[v]),"not started"===v?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Profile"}),r&&Object(n.jsx)(b.a,{variant:"danger",children:r}),Object(n.jsx)("strong",{children:"Name:"})," ",j.name,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Email:"})," ",j.email,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Desires:"})," ",j.desire,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Dislikes:"})," ",j.dislike,"admin"===j.userType&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("br",{}),Object(n.jsx)("div",{className:"w-100 text-center mt-2",children:Object(n.jsx)(x.a,{className:"w-100",onClick:P,variant:"primary",children:"Start Drawing"})})]}),Object(n.jsx)(p.b,{to:"/update-profile",className:"btn btn-primary w-100 mt-3",children:"Update Profile"})]})}),Object(n.jsx)("div",{className:"w-100 text-center mt-2",children:Object(n.jsx)(x.a,{variant:"link",onClick:S,children:"Log Out"})})]}):"started"===v?Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("div",{className:"text-center mt-2",children:Object(n.jsx)(I.a,{color:"secondary"})}),Object(n.jsxs)("div",{className:"w-100 text-center mt-2",children:[Object(n.jsx)("h2",{children:"Pairing..."}),"admin"===j.userType&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("br",{}),Object(n.jsx)(x.a,{onClick:F,variant:"danger",className:"w-100",children:"Cancel Drawing"})]})]})]})})}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Profile"}),r&&Object(n.jsx)(b.a,{variant:"danger",children:r}),Object(n.jsx)("strong",{children:"Name:"})," ",j.name,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Email:"})," ",j.email,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Desires:"})," ",j.desire,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Dislikes:"})," ",j.dislike,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Person:"})," ",j.person,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Person Desire:"})," ",j.personDesire,Object(n.jsx)("br",{}),Object(n.jsx)("strong",{children:"Person Dislike:"})," ",j.personDislike,"admin"===j.userType&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("br",{}),Object(n.jsx)("div",{className:"w-100 text-center mt-2",children:Object(n.jsx)(x.a,{onClick:F,variant:"danger",className:"w-100",children:"Reset Drawing"})})]}),Object(n.jsx)(p.b,{to:"/update-profile",className:"btn btn-primary w-100 mt-3",children:"Update Profile"})]})}),Object(n.jsx)("div",{className:"w-100 text-center mt-2",children:Object(n.jsx)(x.a,{variant:"link",onClick:S,children:"Log Out"})})]})}function W(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),r=Object(c.useState)(""),a=Object(d.a)(r,2),s=a[0],i=a[1],j=Object(c.useState)(!1),m=Object(d.a)(j,2),f=m[0],v=m[1],g=Object(h.g)();function w(){return(w=Object(o.a)(l.a.mark((function r(n){var c,a;return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),r.prev=1,i(""),v(!0),r.next=6,y(null===(c=e.current)||void 0===c?void 0:c.value,null===(a=t.current)||void 0===a?void 0:a.value);case 6:g.push("/"),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(1),i("Failed to log in");case 12:v(!1);case 13:case"end":return r.stop()}}),r,null,[[1,9]])})))).apply(this,arguments)}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Log In"}),s&&Object(n.jsx)(b.a,{variant:"danger",children:s}),Object(n.jsxs)(O.a,{onSubmit:function(e){return w.apply(this,arguments)},children:[Object(n.jsxs)(O.a.Group,{id:"email",children:[Object(n.jsx)(O.a.Label,{children:"Email"}),Object(n.jsx)(O.a.Control,{type:"email",ref:e,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"password",children:[Object(n.jsx)(O.a.Label,{children:"Password"}),Object(n.jsx)(O.a.Control,{type:"password",ref:t,required:!0})]}),Object(n.jsx)(x.a,{disabled:f,className:"w-100",type:"submit",children:"Log In"})]}),Object(n.jsx)("div",{className:"w-100 text-center mt-3",children:Object(n.jsx)(p.b,{to:"/forgot-password",children:"Forgot Password?"})})]})}),Object(n.jsxs)("div",{className:"w-100 text-center mt-2",children:["Need an account? ",Object(n.jsx)(p.b,{to:"/signup",children:"Sign Up"})]})]})}var A=r(31),T=r(44);function V(e){var t=e.component,r=Object(T.a)(e,["component"]),c=U().currentUser;return Object(n.jsx)(h.b,Object(A.a)(Object(A.a)({},r),{},{render:function(e){return c?Object(n.jsx)(t,Object(A.a)({},e)):Object(n.jsx)(h.a,{to:"/login"})}}))}var z=function(){var e=Object(c.useRef)(null),t=Object(c.useState)(""),r=Object(d.a)(t,2),a=r[0],s=r[1],i=Object(c.useState)(""),j=Object(d.a)(i,2),h=j[0],m=j[1],f=Object(c.useState)(!1),v=Object(d.a)(f,2),g=v[0],w=v[1];function y(){return(y=Object(o.a)(l.a.mark((function t(r){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r.preventDefault(),t.prev=1,m(""),s(""),w(!0),!e.current){t.next=8;break}return t.next=8,N(e.current.value);case 8:m("Check your inbox for further instructions"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),s("Failed to reset password");case 14:w(!1);case 15:case"end":return t.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Password Reset"}),a&&Object(n.jsx)(b.a,{variant:"danger",children:a}),h&&Object(n.jsx)(b.a,{variant:"success",children:h}),Object(n.jsxs)(O.a,{onSubmit:function(e){return y.apply(this,arguments)},children:[Object(n.jsxs)(O.a.Group,{id:"email",children:[Object(n.jsx)(O.a.Label,{children:"Email"}),Object(n.jsx)(O.a.Control,{type:"email",ref:e,required:!0})]}),Object(n.jsx)(x.a,{disabled:g,className:"w-100",type:"submit",children:"Reset Password"})]}),Object(n.jsx)("div",{className:"w-100 text-center mt-3",children:Object(n.jsx)(p.b,{to:"/login",children:"Login"})})]})}),Object(n.jsxs)("div",{className:"w-100 text-center mt-2",children:["Need an account? ",Object(n.jsx)(p.b,{to:"/signup",children:"Sign Up"})]})]})};function J(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),r=Object(c.useRef)(null),a=Object(c.useState)(""),s=Object(d.a)(a,2),i=s[0],j=s[1],m=Object(c.useState)(!1),f=Object(d.a)(m,2),v=f[0],g=f[1],w=Object(h.g)(),y=U().currentUser,k=Object(c.useState)({name:"",desire:"",email:"",dislike:"",personDesire:"",personDislike:""}),N=Object(d.a)(k,2),S=N[0],P=N[1];function F(){return(F=Object(o.a)(l.a.mark((function n(c){var a,s,i,o;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),n.prev=1,y){n.next=5;break}return j("Failed to update info"),n.abrupt("return");case 5:return j(""),g(!0),o={name:null===(a=e.current)||void 0===a?void 0:a.value,desire:null===(s=t.current)||void 0===s?void 0:s.value,dislike:null===(i=r.current)||void 0===i?void 0:i.value},n.next=10,C(y.uid,o);case 10:w.push("/"),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(1),""===n.t0&&j("Failed to create an account");case 16:g(!1);case 17:case"end":return n.stop()}}),n,null,[[1,13]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){y&&D(y.uid).then((function(e){P(e.data())}))}),[y,S]),Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.a,{children:Object(n.jsxs)(u.a.Body,{children:[Object(n.jsx)("h2",{className:"text-center mb-4",children:"Update Info"}),i&&Object(n.jsx)(b.a,{variant:"danger",children:i}),Object(n.jsxs)(O.a,{onSubmit:function(e){return F.apply(this,arguments)},children:[Object(n.jsxs)(O.a.Group,{id:"name",children:[Object(n.jsx)(O.a.Label,{children:"Name"}),Object(n.jsx)(O.a.Control,{type:"text",ref:e,defaultValue:S.name,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"want",children:[Object(n.jsx)(O.a.Label,{children:"What you want"}),Object(n.jsx)(O.a.Control,{type:"text",ref:t,defaultValue:S.desire,required:!0})]}),Object(n.jsxs)(O.a.Group,{id:"dontwant",children:[Object(n.jsx)(O.a.Label,{children:"What you don't Want"}),Object(n.jsx)(O.a.Control,{type:"text",ref:r,defaultValue:S.dislike,required:!0})]}),Object(n.jsx)(x.a,{disabled:v,className:"w-100",type:"submit",children:"Update"})]})]})}),Object(n.jsx)("div",{className:"w-100 text-center mt-2",children:Object(n.jsx)(p.b,{to:"/",children:"Cancel"})})]})}var H=function(){return Object(n.jsx)(R.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:Object(n.jsx)("div",{className:"w-100",style:{maxWidth:"400px"},children:Object(n.jsx)(p.a,{children:Object(n.jsx)(q,{children:Object(n.jsxs)(h.d,{children:[Object(n.jsx)(V,{exact:!0,path:"/",component:B}),Object(n.jsx)(V,{path:"/update-profile",component:J}),Object(n.jsx)(h.b,{path:"/signup",component:E}),Object(n.jsx)(h.b,{path:"/login",component:W}),Object(n.jsx)(h.b,{path:"/SecretSanta",component:W}),Object(n.jsx)(h.b,{path:"/forgot-password",component:z})]})})})})})};r(61);i.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(H,{})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.e4a1f2c2.chunk.js.map