(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[9],{899:function(e,t,a){"use strict";a.r(t);var r=a(4),n=a(11),s=a(12),l=a(14),c=a(13),i=a(0),o=a.n(i),u=a(30),m=a(600),d=a(601),D=a(129),p=a(606),E=a(607),b=a(662),h=a(474),y=a(475),C=a(664),v=a(666),g=a(159),f=a(682),_=(a(604),a(2)),S=a.n(_),x=a(49),N=a.n(x),w=a(160),k=a(172),O=a(605),j=a(609),I=a(612),T=a(623),z=a(625),J=a(626),L=a(627),M=a(628),A=a(629),F=a(630),G=a(631),H=a(632),R=a(633),U=a(687),q=a(681),B=a(526),K=a.n(B),P=a(527),Q=a.n(P),V=(a(528),["photos","vehicleDetails","ownerDetails","engineCompartment","transmission","brakeSystem","electricalControls","frontSuspension","rearSuspension","exhaustSystem","bodyInterior","bodyExterior","underbody","tyres","roadTest","finalize"]),W=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={isLoading:!0,activeStep:0,currentData:{_id:null,photos:null,vehicleDetails:null,ownerDetails:null,engineCompartment:null,transmission:null,brakeSystem:null,electricalControls:null,frontSuspension:null,rearSuspension:null,exhaustSystem:null,bodyInterior:null,bodyExterior:null,underbody:null,roadTest:null,tyres:null}},e.toggle=function(t){e.state.activeStep!==t&&e.setState({activeStep:t})},e.setCurrentData=function(t){var a=e.state.currentData;a=Object(r.a)(Object(r.a)({},a),t),e.setState({currentData:a},(function(){f.b.success(JSON.stringify("Success!",null,2))}))},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0});var t=this.state.currentData;t._id=this.props.match.params.id,N.a.get("/api/inspection/get-by-id?_id=".concat(this.props.match.params.id)).then((function(a){var r=a.data;t.photos=r.photos?r.photos:null,t.vehicleDetails=r.vehicle_details?r.vehicle_details:null,t.ownerDetails=r.owner_details?r.owner_details:null,t.engineCompartment=r.engine_compartment?r.engine_compartment:null,t.transmission=r.transmission?r.transmission:null,t.brakeSystem=r.brake_system?r.brake_system:null,t.electricalControls=r.electrical_controls?r.electrical_controls:null,t.frontSuspension=r.front_suspension?r.front_suspension:null,t.rearSuspension=r.rear_suspension?r.rear_suspension:null,t.exhaustSystem=r.exhaust_system?r.exhaust_system:null,t.bodyInterior=r.body_interior?r.body_interior:null,t.bodyExterior=r.body_exterior?r.body_exterior:null,t.underbody=r.underbody?r.underbody:null,t.roadTest=r.road_test?r.road_test:null,t.tyres=r.tyres?r.tyres:null,e.setState({currentData:t,isLoading:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.currentData,r=t.isLoading;return o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{className:"bg-analytics text-white sales-card"},o.a.createElement(d.a,{className:"text-center"},o.a.createElement("img",{src:K.a,alt:"card-img-left",className:"img-left"}),o.a.createElement("img",{src:Q.a,alt:"card-img-right",className:"img-right"}),o.a.createElement("div",{className:"avatar avatar-xl bg-primary shadow avatar-dashboard mt-0"},o.a.createElement("div",{className:"avatar-content"},o.a.createElement(g.a,{className:"text-white",size:28}))),o.a.createElement("div",{className:"award-info text-center"},o.a.createElement("h1",{className:"mb-2 text-white"},"Congratulations John,"),o.a.createElement("div",{className:"m-auto mb-0 w-50"},o.a.createElement(u.a,{to:"/"},o.a.createElement(D.a.Ripple,{block:!0,className:"btn-block bg-gradient-info",color:"none"},"GO TO HOME")))))),o.a.createElement(m.a,null,o.a.createElement(p.a,null,o.a.createElement(E.a,null,"Update Inspection")),o.a.createElement(d.a,null,o.a.createElement("div",{className:""},o.a.createElement(b.a,{tabs:!0,className:"nav-left"},!r&&V&&V.map((function(t,r){return o.a.createElement(h.a,{key:r},o.a.createElement(y.a,{className:S()({active:e.state.activeStep===r}),onClick:function(){e.toggle(r)}},a[t]?o.a.createElement(w.a,{color:"green",size:16,className:"mr-1 fonticon-wrap"}):o.a.createElement(k.a,{color:"red",size:16,className:"mr-1 fonticon-wrap"}),"Step ",r+1))}))),o.a.createElement(C.a,{activeTab:this.state.activeStep,className:"mt-1"},!r&&V&&V.map((function(t,r){return o.a.createElement(v.a,{tabId:r,key:r},0===r&&o.a.createElement(O.a,{setCurrentData:e.setCurrentData,currentData:a}),1==r&&o.a.createElement(j.a,{currentData:a}),2==r&&o.a.createElement(I.a,{setCurrentData:e.setCurrentData,currentData:a}),3==r&&o.a.createElement(T.a,{setCurrentData:e.setCurrentData,currentData:a}),4==r&&o.a.createElement(z.a,{setCurrentData:e.setCurrentData,currentData:a}),5==r&&o.a.createElement(J.a,{setCurrentData:e.setCurrentData,currentData:a}),6==r&&o.a.createElement(L.a,{setCurrentData:e.setCurrentData,currentData:a}),7==r&&o.a.createElement(M.a,{setCurrentData:e.setCurrentData,currentData:a}),8==r&&o.a.createElement(A.a,{setCurrentData:e.setCurrentData,currentData:a}),9==r&&o.a.createElement(F.a,{setCurrentData:e.setCurrentData,currentData:a}),10==r&&o.a.createElement(G.a,{setCurrentData:e.setCurrentData,currentData:a}),11==r&&o.a.createElement(H.a,{setCurrentData:e.setCurrentData,currentData:a}),12==r&&o.a.createElement(R.a,{setCurrentData:e.setCurrentData,currentData:a}),13==r&&o.a.createElement(U.a,{setCurrentData:e.setCurrentData,currentData:a}),14==r&&o.a.createElement(q.a,{setCurrentData:e.setCurrentData,currentData:a}))})))),o.a.createElement(f.a,null))))}}]),a}(o.a.Component);t.default=W}}]);
//# sourceMappingURL=9.373eae1b.chunk.js.map