/** Shared authoring data. Concatenate before rig/motion scripts inside Chorono MCP only. */
const S=1.25, ink='#282421', paper='#FFF5DD', limbColor='#DCD1B9';
const specs=[
  {name:'Pip',x:145,w:144,h:211,face:-143,color:'#F1845D',shade:'#CD6045',kind:'pear',eyes:[-1,1],eyeGap:24,eyeW:24,eyeH:36,pupilW:10,pupilH:20},
  {name:'Milo',x:365,w:174,h:282,shoulder:48,face:-126,color:'#B1A0F0',shade:'#8B77CE',kind:'triangle',eyes:[-1,1],eyeGap:25,eyeW:25,eyeH:35,pupilW:11,pupilH:20},
  {name:'Fig',x:600,w:188,h:158,face:-104,color:'#A7CC91',shade:'#7AAB70',kind:'puddle',eyes:[-1,1],eyeGap:29,eyeW:28,eyeH:30,pupilW:12,pupilH:18},
  {name:'Dot',x:815,w:138,h:193,face:-131,color:'#6EACED',shade:'#4685C7',kind:'robot',eyes:[0],eyeGap:0,eyeW:44,eyeH:36,pupilW:17,pupilH:22}
];
const contacts=[{x:255,y:300,time:330},{x:482.5,y:332,time:405},{x:707.5,y:360,time:480}];
const durations={idle:8000,'shy-pip':3200,'shy-milo':3200,'shy-fig':3200,'shy-dot':3200,excited:1800,curious:3000,celebrate:1200,highfive:1000,sit:3200};
