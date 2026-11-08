/** Connects the saved native pose timelines to the website's existing event contract. */
const machine=scene.addStateMachine('Motion crew · elastic website events');
const names=Object.keys(durations),ids={};
names.forEach(name=>ids[name]=machine.addState(name,'crew-'+name,{id:'crew-state-'+name}));
machine.setInitial(ids.idle);
names.forEach(name=>machine.addTransition('*',ids[name],name,{blendMs:['celebrate','highfive'].includes(name)?100:240,priority:1}));
scene.log(JSON.stringify({machineId:machine.id,events:names}));
