(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[9],{896:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a(11),s=a(12),l=a(14),c=a(13),o=a(0),u=a.n(o),i=a(30),m=a(598),d=a(599),D=a(129),p=a(604),b=a(605),h=a(659),y=a(474),E=a(475),C=a(661),v=a(663),f=a(679),g=(a(602),a(2)),_=a.n(g),S=a(49),x=a.n(S),w=a(159),k=a(172),N=a(603),O=a(607),j=a(610),I=a(621),L=a(622),T=a(623),z=a(624),J=a(625),M=a(626),A=a(627),F=a(628),G=a(629),H=a(630),R=a(681),U=a(678),q=a(527),B=a.n(q),K=(a(528),["photos","vehicleDetails","ownerDetails","engineCompartment","transmission","brakeSystem","electricalControls","frontSuspension","rearSuspension","exhaustSystem","bodyInterior","bodyExterior","underbody","tyres","roadTest","finalize"]),P=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(r.a)(this,a);for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={isLoading:!0,activeStep:0,currentData:{_id:null,photos:null,vehicleDetails:null,ownerDetails:null,engineCompartment:null,transmission:null,brakeSystem:null,electricalControls:null,frontSuspension:null,rearSuspension:null,exhaustSystem:null,bodyInterior:null,bodyExterior:null,underbody:null,roadTest:null,tyres:null}},e.toggle=function(t){e.state.activeStep!==t&&e.setState({activeStep:t})},e.setCurrentData=function(t){var a=e.state.currentData;a=Object(n.a)(Object(n.a)({},a),t),e.setState({currentData:a},(function(){f.b.success(JSON.stringify("Success!",null,2))}))},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0});var t=this.state.currentData;t._id=this.props.match.params.id,x.a.get("/api/inspection/get-by-id?_id=".concat(this.props.match.params.id)).then((function(a){var n=a.data;t.photos=n.photos?n.photos:null,t.vehicleDetails=n.vehicle_details?n.vehicle_details:null,t.ownerDetails=n.owner_details?n.owner_details:null,t.engineCompartment=n.engine_compartment?n.engine_compartment:null,t.transmission=n.transmission?n.transmission:null,t.brakeSystem=n.brake_system?n.brake_system:null,t.electricalControls=n.electrical_controls?n.electrical_controls:null,t.frontSuspension=n.front_suspension?n.front_suspension:null,t.rearSuspension=n.rear_suspension?n.rear_suspension:null,t.exhaustSystem=n.exhaust_system?n.exhaust_system:null,t.bodyInterior=n.body_interior?n.body_interior:null,t.bodyExterior=n.body_exterior?n.body_exterior:null,t.underbody=n.underbody?n.underbody:null,t.roadTest=n.road_test?n.road_test:null,t.tyres=n.tyres?n.tyres:null,e.setState({currentData:t,isLoading:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.currentData,n=t.isLoading;return u.a.createElement(u.a.Fragment,null,u.a.createElement(m.a,{className:"text-white sales-card"},u.a.createElement(d.a,{className:"text-center"},u.a.createElement("div",{className:"award-info text-center"},u.a.createElement("img",{src:B.a,height:"50",className:"mb-2",alt:"homeLogo"}),u.a.createElement("div",{className:"m-auto mb-0 w-50"},u.a.createElement(i.a,{to:"/"},u.a.createElement(D.a.Ripple,{block:!0,className:"btn-block bg-warning text-white",color:"none"},"GO TO HOME")))))),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement(b.a,null,"Update Inspection")),u.a.createElement(d.a,null,u.a.createElement("div",{className:""},u.a.createElement(h.a,{tabs:!0,className:"nav-left"},!n&&K&&K.map((function(t,n){return u.a.createElement(y.a,{key:n},u.a.createElement(E.a,{className:_()({active:e.state.activeStep===n}),onClick:function(){e.toggle(n)}},a[t]?u.a.createElement(w.a,{color:"green",size:16,className:"mr-1 fonticon-wrap"}):u.a.createElement(k.a,{color:"red",size:16,className:"mr-1 fonticon-wrap"}),"Step ",n+1))}))),u.a.createElement(C.a,{activeTab:this.state.activeStep,className:"mt-1"},!n&&K&&K.map((function(t,n){return u.a.createElement(v.a,{tabId:n,key:n},0===n&&u.a.createElement(N.a,{setCurrentData:e.setCurrentData,currentData:a}),1===n&&u.a.createElement(O.a,{currentData:a}),2===n&&u.a.createElement(j.a,{setCurrentData:e.setCurrentData,currentData:a}),3===n&&u.a.createElement(I.a,{setCurrentData:e.setCurrentData,currentData:a}),4===n&&u.a.createElement(L.a,{setCurrentData:e.setCurrentData,currentData:a}),5===n&&u.a.createElement(T.a,{setCurrentData:e.setCurrentData,currentData:a}),6===n&&u.a.createElement(z.a,{setCurrentData:e.setCurrentData,currentData:a}),7===n&&u.a.createElement(J.a,{setCurrentData:e.setCurrentData,currentData:a}),8===n&&u.a.createElement(M.a,{setCurrentData:e.setCurrentData,currentData:a}),9===n&&u.a.createElement(A.a,{setCurrentData:e.setCurrentData,currentData:a}),10===n&&u.a.createElement(F.a,{setCurrentData:e.setCurrentData,currentData:a}),11===n&&u.a.createElement(G.a,{setCurrentData:e.setCurrentData,currentData:a}),12===n&&u.a.createElement(H.a,{setCurrentData:e.setCurrentData,currentData:a}),13===n&&u.a.createElement(R.a,{setCurrentData:e.setCurrentData,currentData:a}),14===n&&u.a.createElement(U.a,{setCurrentData:e.setCurrentData,currentData:a}))})))),u.a.createElement(f.a,null))))}}]),a}(u.a.Component);t.default=P}}]);
//# sourceMappingURL=9.236f46a4.chunk.js.map