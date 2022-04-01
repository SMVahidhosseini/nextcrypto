import { useOutsideAlerter } from './outsideAlerter'
import { useState, useEffect } from 'react'

const Delete = ({showdelete, setshowdelete, deletecoin, portfolio, setportfolio, ids, setids, setsortItem}) => {

	// Show delete modal______________________________________________________________________________________________
	const { visible: showdelete2, setVisible: setshowdelete2, ref } = useOutsideAlerter(true)

	useEffect(() => {
		if (showdelete) {
			setshowdelete(showdelete2);
			setshowdelete2(showdelete);
		}
	}, [showdelete2]);
	// Show delete modal______________________________________________________________________________________________

	const handledelete = (e) => {
		let idss = ids + `%2C%20`;
		setids(idss);
		if (e.target.innerText == 'Yes') {
			var index = portfolio.map(coin => {
				return coin.id;
			}).indexOf(deletecoin.id);

			if (index > -1) {
				portfolio.splice(index, 1);
				localStorage.setItem('portfolio', JSON.stringify(portfolio));
			}
			setportfolio(portfolio);
			localStorage.setItem('portfolio', JSON.stringify(portfolio));
			const portfolio2 = JSON.parse(localStorage.getItem('portfolio'));
			setportfolio(portfolio2);
		}
		setsortItem('');
		setshowdelete2(false);
	}

	return(
		<>
			{showdelete && <div className="delbackdrop">
				{showdelete2 && <div className="delmain" ref={ref} >
					<div className="editform">
						<div className="deletelabel" >Are you sure you want to delete {deletecoin.name} from your portfolio?</div>
						<button className="deletesubmit" onClick={handledelete} >Yes</button>
						<button className="deletesubmit" onClick={handledelete} >No</button>
					</div>
				</div>}
			</div>}
		</>
	);
}

export default Delete;