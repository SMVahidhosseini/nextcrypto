import { useOutsideAlerter } from './outsideAlerter'
import { useState, useEffect } from 'react'
import sigDigit from './sigDigits'

const Edit = ({showedit, setshowedit, editcoin, portfolio, setportfolio3, ids, setids, holdinginedit, setholdinginedit, setsortItem}) => {

	// Show edit modal______________________________________________________________________________________________
	const { visible: showedit2, setVisible: setshowedit2, ref } = useOutsideAlerter(true)

	useEffect(() => {
		if (showedit) {
			setshowedit(showedit2);
			setshowedit2(showedit);
		}
	}, [showedit2]);
	// Show edit modal______________________________________________________________________________________________

	const handleholding = (e) => {
		e.preventDefault();
		let idss = ids + `%2C%20`;
		setids(idss);
		let holding = {holding: e.target[0].value};
		Object.assign(editcoin, holding);
		let balance = {balance: (e.target[0].value * editcoin.current_price)};
		Object.assign(editcoin, balance);
		localStorage.setItem('portfolio', JSON.stringify(portfolio));
		setportfolio3(portfolio);
		setsortItem('');
		setshowedit2(false);
	}

	const changeholding = (e) => {
		setholdinginedit(e.target.value);
	}

	return(
		<>
			{showedit && <div className="adhbackdrop">
				{showedit2 && <div className="adhmain" ref={ref} >
					<h3>Set The {editcoin.name} Holding</h3>
					<form className="editform" onSubmit = {handleholding}>
						<label className="editlabel" >Holding: </label>
						<input className="editinput" type="number" step="any" name="CoinsPerPage" value={holdinginedit} onChange={changeholding} />
						<input className="editsubmit" type="submit" value="&#10551;" />
						<label className="editlabel" >~{sigDigit(holdinginedit * editcoin.current_price)} $</label>
					</form>
				</div>}
			</div>}
		</>
	);
}

export default Edit;