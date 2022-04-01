import { useEffect } from 'react';

const PageNumber = ({ pageNo, setPageNo, pageCoinNo, setPageCoinNo, activePage, setActivePage, finalPage, setFinalPage, sortItem, setsortItem, descendingorder, setdescendingorder}) => {
	const getPageCoins = (e) => {
		e.preventDefault();
		setPageNo(e.target[0].value);
	}

	useEffect(() => {
		setActivePage(pageNo);
		setdescendingorder(true);
		setsortItem('market_cap_rank');
		if (pageNo > finalPage) {
			setFinalPage(pageNo);
		} else {
			setFinalPage(12000/pageCoinNo);
		}
	}, [pageNo, activePage, pageCoinNo]);

	return(
		<div className="coindivperpage">
			<form className="coinformperpage" onSubmit={getPageCoins}>
				<label className="coinlabelperpage">Page</label>
				<input className="coininputperpage" type="number" name="CoinsPerPage" key={pageNo} defaultValue={pageNo} />
				<input className="coinsubmitperpage" type="submit" value='&#10551;' />
				<input className={pageNo == 1 ? 'coinhidefirstpagetag' : 'coinnumberperpage'} type="button" name="first" value={pageNo-1} onClick={(e) => {
					setPageNo(e.target.value);
				} } />
				<input className="coinactivenumber" type="button" name="second" value={pageNo} />
				<input className={pageNo >= (12000/pageCoinNo) ? 'coinhidefirstpagetag' : 'coinnumberperpage'} type="button" name="third" value={pageNo-1+2} onClick={(e) => {
					setPageNo(e.target.value);
				} } />
				<div className={pageNo >= finalPage-2 ? 'coinhidefirstpagetag' : 'cointhreepoint'} >...</div>
				<input className={pageNo >= finalPage-1 ? 'coinhidefirstpagetag' : 'coinnumberperpage'} type="button" name="last" value={finalPage} onClick={(e) => {
					setPageNo(e.target.value);
				} } />
			</form>
		</div>
	);
}

export default PageNumber;