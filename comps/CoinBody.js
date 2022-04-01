import T_main_h from './T_main_h';
import T_main_coins from './T_main_coins';
import PageNumber from './PageNumber';
import HTComps from './HTComps';

const CoinBody = ({pageCoins, pageCoinNo, pageNo, setPageCoinNo, setPageNo, activePage, setActivePage, finalPage, setFinalPage, sortItem, setsortItem, descendingorder, setdescendingorder}) => {

	return(
		<div className="coinbody">
			<HTComps pageCoinNo={pageCoinNo} setPageCoinNo={setPageCoinNo} descendingorder={descendingorder}
				setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem} />
			<T_main_h descendingorder={descendingorder} setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem} />
			<T_main_coins pageCoinNo={pageCoinNo} pageNo={pageNo} descendingorder={descendingorder} setdescendingorder={setdescendingorder}
				sortItem={sortItem} setsortItem={setsortItem} pageCoins={pageCoins} />
			<PageNumber pageCoinNo={pageCoinNo} pageNo={pageNo} setPageCoinNo={setPageCoinNo} activePage={activePage}
				setActivePage={setActivePage} finalPage={finalPage} setFinalPage={setFinalPage} setPageNo={setPageNo}
				descendingorder={descendingorder} setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem} />
		</div>
	);
}

export default CoinBody;