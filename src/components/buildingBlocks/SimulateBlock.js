import React, {useState} from 'react';
import {TenderlySim, setupTenderly} from '../../ethereum/TenderlySim';


function SimulateBlock({blocks, chainId}){
	console.log(chainId);
	
	const [finishedBlocks, addBlock] = useState([]);
	const [nonce, setNonce] = useState(0); 

	function runSim(){
		setupTenderly(chainId).then(tenderlyProvider =>{
			TenderlySim(blocks, tenderlyProvider).then(x =>{
				addBlock(x);
				setNonce(nonce+1);
			});
		});
	}
	

	if(finishedBlocks.length ==0){
		return <button  onClick={() => runSim()}> {'Run'}</button>;
	}

	return<div>{finishedBlocks.map(block =>{
		return (
			<div key={block.tenderlyURL}>{block.block.function.name + ' on ' + block.block.block.name } {block.block.name !== block.block.block.name && ' on ' + block.block.name } { <a target={'_blank'} rel={'noreferrer'} href={block.tenderlyURL}> {(block.success ? ' succeeded ' : 'failed ')} </a>} </div> 
		);
	})}</div>;

}



export default SimulateBlock;