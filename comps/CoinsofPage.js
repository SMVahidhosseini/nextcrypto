import {useState} from 'react'

const CoinsofPage = ({pageCoinNo, setPageCoinNo, sortItem, setsortItem, descendingorder, setdescendingorder}) => {
	const getPageCoins = (e) => {
		e.preventDefault();
		setPageCoinNo(e.target[0].value);
		setdescendingorder(true);
		setsortItem('market_cap_rank');
	}

	return(
		<div className="htdivperpage">
			<form className="htformperpage" onSubmit = {getPageCoins}>
				<label className="htlabelperpage">Coins Per Page</label> <br />
				<input className="htinputperpage" type="number" name="CoinsPerPage" defaultValue = {pageCoinNo} />
				<input className="htsubmitperpage" type="submit" value="&#8635;" />
			</form>
		</div>
	);
}

export default CoinsofPage;