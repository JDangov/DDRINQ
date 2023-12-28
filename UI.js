function showTickerInfo(dictTableInfo, sTableContainer, sTableId, iaRound, iaFactor) {
    const table = document.createElement('table');
    table.classList.add("display");
    table.id = sTableId;
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    var saColumnHeader = dictTableInfo["Headers"].split(',');
    var iColumnHeaderLength = saColumnHeader.length;
    for (var iColumnIndex = 0; iColumnIndex < iColumnHeaderLength; iColumnIndex++) {
        const th = document.createElement('th');
        th.innerHTML = saColumnHeader[iColumnIndex].replace(/ /g, '<br>');
        th.style.backgroundColor = '#f0f0f0';
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dictData = dictTickerInfo["Data"];
    for (var sTicker in dictData) {
        var saRowData = dictData[sTicker].split(',');
        iRowDataLength = saRowData.length;
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = sTicker;
        row.appendChild(cell);
        for (var iColumnIndex = 0; iColumnIndex < iRowDataLength; iColumnIndex++) {
            const cell = document.createElement('td');
            const iRound = iaRound[iColumnIndex];
            if (iRound > 0) {
                cell.textContent = (parseFloat(saRowData[iColumnIndex]) * (iaFactor[iColumnIndex] == null ? 1 : iaFactor[iColumnIndex])).toFixed(iRound);
            } else if (iRound == 0) {
                cell.textContent = '' + parseInt(saRowData[iColumnIndex]);
            } else {
                cell.textContent = saRowData[iColumnIndex];
            }
            if (saColumnHeader[iColumnIndex + 1].endsWith('Return') || saColumnHeader[iColumnIndex + 1].endsWith('Percent'))
                cell.textContent += '%';
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    document.getElementById(sTableContainer).innerHTML = "";
    document.getElementById(sTableContainer).appendChild(table);
}

function showTableInfo(dictTableInfo, sTableContainer, sTableId, iaRound, iaFactor) {
    const table = document.createElement('table');
    table.classList.add("display");
    table.id = sTableId;
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    var saColumnHeader = dictTableInfo["Headers"].split(',');
    var iColumnHeaderLength = saColumnHeader.length;
    for (var iColumnIndex = 0; iColumnIndex < iColumnHeaderLength; iColumnIndex++) {
        const th = document.createElement('th');
        th.innerHTML = saColumnHeader[iColumnIndex].replace(/ /g, '<br>');
        th.style.backgroundColor = '#f0f0f0';
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const vaData = dictTickerInfo["Data"];
    for (var iDataIndex in vaData) {
        const dictData = vaData[iDataIndex];
        const sTicker = Object.keys(dictData)[0];
        const saRowData = dictData[sTicker].split(',')
        iRowDataLength = saRowData.length;
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = sTicker;
        row.appendChild(cell);
        for (var iColumnIndex = 0; iColumnIndex < iRowDataLength; iColumnIndex++) {
            const cell = document.createElement('td');
            const iRound = iaRound[iColumnIndex];
            if (iRound > 0) {
                cell.textContent = (parseFloat(saRowData[iColumnIndex]) * (iaFactor[iColumnIndex] == null ? 1 : iaFactor[iColumnIndex])).toFixed(iRound);
            } else if (iRound == 0) {
                cell.textContent = '' + parseInt(saRowData[iColumnIndex]);
            } else {
                cell.textContent = saRowData[iColumnIndex];
            }
            if (saColumnHeader[iColumnIndex + 1].endsWith('Return') || saColumnHeader[iColumnIndex + 1].endsWith('Percent'))
                cell.textContent += '%';
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    document.getElementById(sTableContainer).innerHTML = '';
    document.getElementById(sTableContainer).appendChild(table);
}

function showAnalysisTableInfo(dictTotalsSummary, sTableContainer) {
    document.getElementById(sTableContainer).innerHTML = `

    <h3>DDrINQ Individual Daily Return Summary From ${dictTotalsSummary["StartDate"]} to ${dictTotalsSummary["EndDate"]}</h3>
    <section class="summary-list">
        <ul>
            <li>
                ${dictTotalsSummary["BuySellCumulativeDailyReturnTotalCount"]} total investments (buy/sell pairs).
                ${dictTotalsSummary["BuySellCumulativeDailyReturnPositiveCount"]} were profitable.
                ${dictTotalsSummary["BuySellCumulativeDailyReturnNegativeCount"]} were losses.
            </li>
            <br>
            <li>
                ${fn(dictTotalsSummary["BuySellCumulativeDailyReturnPositivePercent"], '', '%', 2)} positive.
                ${fn(dictTotalsSummary["BuySellCumulativeDailyReturnNegativePercent"], '', '%', 2)} negative.
                ${fn(dictTotalsSummary["BuySellCumulativeDailyReturnMedian"], '', '%', 4, 100)} median daily return.
                ${fn(dictTotalsSummary["BuySellCumulativeDailyReturnAverage"], '', '%', 4, 100)} average daily return.
            </li>
        </ul>
    </section>

    <h3>DDrINQ Annual Daily Return Summary From ${dictTotalsSummary["StartDate"]} to ${dictTotalsSummary["EndDate"]}</h3>
    <section class="summary-list">
        <ul>
            <li>
                ${dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnTotalCount"]} total investment Sets (buy/sell pairs).
                ${dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnPositiveCount"]} were profitable.
                ${dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnNegativeCount"]} were losses.
            </li>
            <br>
            <li>
                ${fn(dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnPositivePercent"], '', '%', 2)} positive.
                ${fn(dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnNegativePercent"], '', '%', 2)} negative.
                ${fn(dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnMedian"], '', '%', 4, 100)} median daily return.
                ${fn(dictTotalsSummary["AnnualizedCumulativeBuySellDailyReturnAverage"], '', '%', 4, 100)} average daily return.
            </li>
        </ul>
        <p style="margin-left: 20px;">
            <b>&rarr;</b>&nbsp;${fn(dictTotalsSummary["AnnualDailyReturnLossPercent"], '', '%', 0, 1)} more negative than buy/sell.
            ${fn(dictTotalsSummary["AnnualDailyReturnGainPercent"], '', '%', 0, 1)} more positive than buy/hold.<br>
            <b>&rarr;</b>&nbsp;${fn(dictTotalsSummary["AnnualDailyReturnMedianPercent"], '', '%', 0, 1)} higher median than buy/hold.
            ${fn(dictTotalsSummary["AnnualDailyReturnAveragePercent"], '', '%', 0, 1)} higher average than buy/hold.
        </p>
    </section>

    <h3>Annual Buy & Hold Daily Return Summary From ${dictTotalsSummary["StartDate"]} to ${dictTotalsSummary["EndDate"]}</h3>
    <section class="summary-list">
        <ul>
            <li>
                ${dictTotalsSummary["AnnualCumulativeDailyReturnTotalCount"]} total investments (start/end annual return).
                ${dictTotalsSummary["AnnualCumulativeDailyReturnPositiveCount"]} were profitable.
                ${dictTotalsSummary["AnnualCumulativeDailyReturnNegativeCount"]} were losses.
            </li>
            <br>
            <li>
                ${fn(dictTotalsSummary["AnnualCumulativeDailyReturnPositivePercent"], '', '%', 2)} positive.
                ${fn(dictTotalsSummary["AnnualCumulativeDailyReturnNegativePercent"], '', '%', 2)} negative.
                ${fn(dictTotalsSummary["AnnualCumulativeDailyReturnMedian"], '', '%', 4, 100)} median daily return.
                ${fn(dictTotalsSummary["AnnualCumulativeDailyReturnAverage"], '', '%', 4, 100)} average daily return.
            </li>
        </ul>
    </section>

    <h3>Conditional Similarities From ${dictTotalsSummary["StartDate"]} to ${dictTotalsSummary["EndDate"]}</h3>
    <section class="summary-list">
        <ul>
            <li>
                ${fn(dictTotalsSummary["TotalBuySellReturnMedian"], '', '%', 2, 100)} median buy/sell return.
                ${fn(dictTotalsSummary["TotalBuySellReturnAverage"], '', '%', 2, 100)} average buy/sell return.
            </li>
            <br>
            <li>
                ${fn(dictTotalsSummary["AnnualReturnMedian"], '', '%', 2, 100)} median buy/hold return).
                ${fn(dictTotalsSummary["AnnualReturnAverage"], '', '%', 2, 100)} average buy/hold return.
            </li>
        </ul>
    </section>

    <p style="margin-left: 20px;">
        <b>&rarr;</b>&nbsp;${fn(dictTotalsSummary["AnnualReturnMedianPercent"], '', '%', 0, 1)} higher median than buy/hold.
        ${fn(dictTotalsSummary["AnnualReturnAveragePercent"], '', '%', 0, 1)} higher average than buy/hold.
    </p>

    <h3>Ticker Count = ${dictTotalsSummary["TickerCount"]}</h3>
`;
}

function showSelectedTableInfo(sSelectedItem, dictTableInfo, sTableContainer, sTableId, iaRound, iaFactor) {
    const table = document.createElement('table');
    table.classList.add("display");
    table.id = sTableId;
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    var saColumnHeader = ('Id,' + dictTableInfo["Headers"]).split(',');
    iColumnHeaderLength = saColumnHeader.length;
    for (var iColumnIndex = 1; iColumnIndex < iColumnHeaderLength; iColumnIndex++) {
        const th = document.createElement('th');
        th.innerHTML = saColumnHeader[iColumnIndex].replace(/ /g, '<br>');
        th.style.backgroundColor = '#f0f0f0';
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    dictData = dictTableInfo["Data"][sSelectedItem];
    for (var sTickerInfo in dictData) {
        var saRowData = dictData[sTickerInfo].split(',');
        iRowDataLength = saRowData.length;
        const row = document.createElement('tr');
        for (var iColumnIndex = 0; iColumnIndex < iRowDataLength; iColumnIndex++) {
            const cell = document.createElement('td');
            const iRound = iaRound[iColumnIndex];
            if (iRound > 0) {
                cell.textContent = (parseFloat(saRowData[iColumnIndex]) * (iaFactor[iColumnIndex] == null ? 1 : iaFactor[iColumnIndex])).toFixed(iRound);
            } else if (iRound == 0) {
                cell.textContent = '' + parseInt(saRowData[iColumnIndex]);
            } else {
                cell.textContent = saRowData[iColumnIndex];
            }
            if (saColumnHeader[iColumnIndex + 1].endsWith('Return') || saColumnHeader[iColumnIndex + 1].endsWith('Percent'))
                cell.textContent += '%';
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    document.getElementById(sTableContainer).innerHTML = "";
    document.getElementById(sTableContainer).appendChild(table);
}

function cellLessColor(sTableName, vThresholds, sColumnIndex) {
    $(document).ready(function () {
        const iThresholdsLength = vThresholds.length;
        $('#' + sTableName + ' tr').each(function () {
            var cellValue = parseFloat($(this).find('td:eq(' + sColumnIndex + ')').text());
            for (var iCell = 0; iCell < iThresholdsLength; iCell++) {
                if (cellValue < vThresholds[iCell].value) {
                    $(this).find('td:eq(' + sColumnIndex + ')').addClass(vThresholds[iCell].class);
                    break;
                }
            }
        });
    });
}

function cellMoreColor(sTableName, vThresholds, sColumnIndex) {
    $(document).ready(function () {
        const iThresholdsLength = vThresholds.length;
        $('#' + sTableName + ' tr').each(function () {
            var cellValue = parseFloat($(this).find('td:eq(' + sColumnIndex + ')').text());
            for (var iCell = 0; iCell < iThresholdsLength; iCell++) {
                if (cellValue > vThresholds[iCell].value) {
                    $(this).find('td:eq(' + sColumnIndex + ')').addClass(vThresholds[iCell].class);
                    break;
                }
            }
        });
    });
}

function showTabOnHover(tabName) {
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) { tabs[i].style.display = "none"; }
    document.getElementById(tabName).style.display = "block";
    oTopSectionStyle = document.getElementById('topSection').style
    if ((tabName === 'HomeTab') || (tabName === 'TickerAnalysisTab') || (tabName === 'BuyTab') || (tabName === 'SellTab') ||
        (tabName === 'SummaryTab') || (tabName === 'LastSoldTab') || (tabName === 'LastTransactionTab')
    ) {
        oTopSectionStyle.display = "none";
    } else {
        oTopSectionStyle.display = "block";
    }
    var oTickerMenu = document.querySelector('ticker-menu');
    var oULElement = oTickerMenu.querySelector('ul');
    var oILElements = oULElement.querySelectorAll('li');
    for (var oILElement of oILElements) {
        oILElement.style.backgroundColor = '';
        var oAnchors = oILElement.querySelectorAll('a');
        for (var oAnchor of oAnchors) {
            oAnchor.style.color = '';
        }
    }
    document.getElementById('TickerBriefSummaryTab').style.display = 'block';
    document.getElementById('TickerTransactionTab').style.display = 'block';
    document.getElementById('TickerLastTransactionTab').style.display = 'block';
}

function mouseOutMenu(oItem) {
    oItem.style.backgroundColor = 'black';
    var oAnchors = oItem.querySelectorAll('a');
    for (var oAnchor of oAnchors) {
        oAnchor.style.color = 'white';
    }
}

function fn(sValue, sPrefix = '', sSuffix = '', iDigits = 2, iFactor = 1) {
    return sPrefix + (parseFloat(sValue) * iFactor).toFixed(iDigits) + sSuffix;
}

function onSelectTicker() {
    var selectedTicker = document.getElementById("tickerSelector").value;

    var leftTextSuffix = " 500 days";
    var leftImageSuffix = "_None_500.png"
    document.getElementById("leftHeader").innerText = selectedTicker + leftTextSuffix;
    document.getElementById("leftImage").title = selectedTicker + leftTextSuffix;
    document.getElementById("leftImage").src = "./500/" + selectedTicker + leftImageSuffix;
    document.getElementById("leftImage").alt = selectedTicker + leftImageSuffix;

    var rightTextSuffix = " 250 days";
    var rightImageSuffix = "_None_250.png"
    document.getElementById("rightHeader").innerText = selectedTicker + rightTextSuffix;
    document.getElementById("rightImage").title = selectedTicker + rightTextSuffix;
    document.getElementById("rightImage").src = "./250/" + selectedTicker + rightImageSuffix;
    document.getElementById("rightImage").alt = selectedTicker + rightImageSuffix;

    var returnsTextSuffix = " Returns";
    var returnsImageSuffix = "_Returns.png"
    document.getElementById("returnsHeader").innerText = selectedTicker + returnsTextSuffix;
    document.getElementById("returnsImage").title = selectedTicker + returnsTextSuffix;
    document.getElementById("returnsImage").src = "./One/" + selectedTicker + returnsImageSuffix;
    document.getElementById("returnsImage").alt = selectedTicker + returnsImageSuffix;

    var fullReturnsTextSuffix = " Full Span";
    var fullReturnsImageSuffix = "_Full_Returns.png"
    document.getElementById("fullReturnsHeader").innerText = selectedTicker + fullReturnsTextSuffix;
    document.getElementById("fullReturnsImage").title = selectedTicker + fullReturnsTextSuffix;
    document.getElementById("fullReturnsImage").src = "./All/" + selectedTicker + fullReturnsImageSuffix;
    document.getElementById("fullReturnsImage").alt = selectedTicker + fullReturnsImageSuffix;

    var sTickerInfo = dictBuyTickerInfo['Data'][selectedTicker];
    var obuyOrSellDetails = document.getElementById("buyOrSellDetails");
    if (sTickerInfo === undefined) {
        sTickerInfo = dictSellTickerInfo['Data'][selectedTicker];
        if (sTickerInfo === undefined) {
            obuyOrSellDetails.innerHTML = '';
        } else {
            var saColumnValues = sTickerInfo.split(',');
            obuyOrSellDetails.innerHTML = 'Sell:' + fn(saColumnValues[0], '$', '', 2) + ', Last:' + fn(saColumnValues[1], '$', '', 2) + ', Delta:' + fn(saColumnValues[3], '$', '', 2) + '; ' + saColumnValues[4] + '%';
        }
    } else {
        var saColumnValues = sTickerInfo.split(',');
        obuyOrSellDetails.innerHTML = 'Buy:' + fn(saColumnValues[0], '$', '', 2) + ', Last:' + fn(saColumnValues[1], '$', '', 2) + ', Delta:' + fn(saColumnValues[3], '$', '', 2) + '; ' + saColumnValues[4] + '%';
    }
    showSelectedTableInfo(selectedTicker, dictBuySellTableInfo, 'transactionsTableContainer', 'transactionsTable', aiRound = iaTransactionsRound, iaFactor = iaTransactionsFactor);
    cellMoreColor(sTableName = 'transactionsTable', vThresholds = vaTransactionsTableThresholds, sColumnIndex = sTransactionsTableThresholdOrderColumnIndex);
    $(document).ready(function () { $('#transactionsTable').DataTable({ "order": [[iTransactionsTableThresholdOrderColumnIndex, 'desc']] }); });

    showSelectedTableInfo(selectedTicker, dictDetailSummaryTableInfo, 'tickerBriefSummaryTableContainer', 'tickerBriefSummaryTable', aiRound = iaDetailSummaryRound, iaFactor = iaDetailSummaryFactor);
    cellMoreColor(sTableName = 'tickerBriefSummaryTable', vThresholds = vaDetailSummaryTableThresholds, sColumnIndex = sDetailSummaryTableThresholdOrderColumnIndex);
    $(document).ready(function () { $('#tickerBriefSummaryTable').DataTable({ "order": [[iDetailSummaryTableThresholdOrderColumnIndex, 'desc']] }); });

    showSelectedTableInfo(selectedTicker, dictBriefSummaryTableInfo, 'briefSummaryTableContainer', 'briefSummaryTable', aiRound = iaBriefSummaryRound, iaFactor = iaBriefSummaryFactor);
    cellMoreColor(sTableName = 'briefSummaryTable', vThresholds = vaBriefSummaryTableThresholds, sColumnIndex = sBriefSummaryTableThresholdOrderColumnIndex);
    $(document).ready(function () { $('#briefSummaryTable').DataTable({ "order": [[iBriefSummaryTableThresholdOrderColumnIndex, 'desc']] }); });

    var dictTickerLastTransaction = { "Headers": dictLastTransaction['Headers'], "Data": { [selectedTicker]: dictLastTransaction['Data'][selectedTicker] } };
    showTickerInfo(dictTickerInfo = dictTickerLastTransaction, sTickerContainer = 'tickerLastTransactionTableContainer', sTableId = 'tickerLastTransactionTable', iaRound = iaLastTransactionRound, iaFactor = iaLastTransactionFactor);

    showAnalysisTableInfo(dictTickerTotals[selectedTicker], 'tickerAnalysisTableContainer');
    document.querySelector('[onmouseover="showTabOnHover(\'TickerAnalysisTab\')"] a').textContent = "Analysis: " + selectedTicker;

    showSelectedTableInfo(selectedTicker, dictBuySellTableInfo, 'tickerTransactionTableContainer', 'tickerTransactionTable', aiRound = iaTransactionsRound, iaFactor = iaTransactionsFactor);
    cellMoreColor(sTableName = 'tickerTransactionTable', vThresholds = vaTransactionsTableThresholds, sColumnIndex = "6");
    $(document).ready(function () { $('#tickerTransactionTable').DataTable({ "order": [[iTransactionsTableThresholdOrderColumnIndex, 'desc']] }); });
}

function populateTickerSelector(sSetType) {
    var oTickerSelector = document.getElementById("tickerSelector");
    if (sSetType === "buy") {
        saTickerSet = Object.keys(dictBuyTickerInfo['Data']);
    } else if (sSetType === "sell") {
        saTickerSet = Object.keys(dictSellTickerInfo['Data']);
    } else if (sSetType === "held") {
        saBuyTickerSet = new Set(Object.keys(dictBuyTickerInfo['Data']))
        saTickerSet = Object.keys(dictLastTransaction.Data).filter(key => dictLastTransaction.Data[key].includes('Bought')).filter(key => !saBuyTickerSet.has(key));
    } else if (sSetType === "wait") {
        saSellTickerSet = new Set(Object.keys(dictSellTickerInfo['Data']))
        saHeldSet = new Set(Object.keys(dictLastTransaction.Data).filter(key => dictLastTransaction.Data[key].includes('Bought')));
        saTickerSet = saTicker.filter(element => !saSellTickerSet.has(element) && !saHeldSet.has(element));
    } else {
        saTickerSet = saTicker;
    }

    document.getElementById("buyOrSellDetailsCount").innerHTML = saTickerSet.length;
    oTickerSelector.innerHTML = '';
    saSortedTickerSet = saTickerSet.sort()
    for (var sTicker of saSortedTickerSet) {
        var option = document.createElement("option");
        option.value = sTicker;
        option.text = sTicker;
        oTickerSelector.appendChild(option);
    }
    oTickerSelector.focus();
    oTickerSelector.selectedIndex = 0;
    onSelectTicker();
}

vaBuySellReturnThresholds = [
    { class: 'green', value: .7 },
    { class: 'lightgreen', value: 0.5 },
    { class: 'blue', value: 0.3 },
    { class: 'yellow', value: 0.1 },
    { class: 'orange', value: 0.0 },
    { class: 'red', value: -1.0 }
];
iBuyThresholdOrderColumnIndex = 6;
sBuyThresholdOrderColumnIndex = "" + iBuyThresholdOrderColumnIndex;
iaBuyRound = [null, 2, 2, 2, 4, 4, 4];
iaBuyFactor = [null, null, null, null, null, 100, 100];
showTickerInfo(dictTickerInfo = dictBuyTickerInfo, sTickerContainer = 'buyTableContainer', sTableId = 'buyTable', iaRound = iaBuyRound, iaFactor = iaBuyFactor);
cellMoreColor(sTableName = 'buyTable', vThresholds = vaBuySellReturnThresholds, sColumnIndex = sBuyThresholdOrderColumnIndex);
$(document).ready(function () { $('#buyTable').DataTable({ "order": [[iBuyThresholdOrderColumnIndex, 'desc']] }); });

iSellThresholdOrderColumnIndex = 6;
sSellThresholdOrderColumnIndex = "" + iSellThresholdOrderColumnIndex;
iaSellRound = [null, 2, 2, 2, 4, 4, 4];
iaSellFactor = [null, null, null, null, null, 100, 100];
showTickerInfo(dictTickerInfo = dictSellTickerInfo, sTickerContainer = 'sellTableContainer', sTableId = 'sellTable', iaRound = iaSellRound, iaFactor = iaSellFactor);
cellMoreColor(sTableName = 'sellTable', vThresholds = vaBuySellReturnThresholds, sColumnIndex = sSellThresholdOrderColumnIndex);
$(document).ready(function () { $('#sellTable').DataTable({ "order": [[iSellThresholdOrderColumnIndex, 'desc']] }); });

vaSummaryTableThresholds = [
    { class: 'blue', value: 1. },
    { class: 'lightblue', value: 0.5 },
    { class: 'green', value: 0.2 },
    { class: 'lightgreen', value: 0.1 },
    { class: 'yellow', value: -0.2 },
    { class: 'red', value: -100. }
];
iSummaryTableThresholdOrderColumnIndex = 9;
sSummaryTableThresholdOrderColumnIndex = "" + iSummaryTableThresholdOrderColumnIndex;
iaSummaryRound = [null, 2, 2, 2, null, 2, 2, 4, 4, 2, 2];
iaSummaryFactor = [null, null, null, 100, null, 100, 100, 100, 100, 100, 100];
cellMoreColor(sTableName = 'summaryTable', vThresholds = vaSummaryTableThresholds, sColumnIndex = sSummaryTableThresholdOrderColumnIndex);
showTableInfo(dictTickerInfo = dictSummaryTableInfo, sTickerContainer = 'summaryTableContainer', sTableId = 'summaryTable', iaRound = iaSummaryRound, iaFactor = iaSummaryFactor);
$(document).ready(function () { $('#summaryTable').DataTable({ "order": [[iSummaryTableThresholdOrderColumnIndex, 'desc']] }); });

vaLastTransactionThresholds = [
];
iLastTransactionThresholdOrderColumnIndex = 2;
sLastTransactionThresholdOrderColumnIndex = "" + iLastTransactionThresholdOrderColumnIndex;
iaLastTransactionRound = [null, 2, 2, 2, 2, 2, null, 2];
iaLastTransactionFactor = [null, null, null, null, null, null, null, null];
cellLessColor(sTableName = 'lastTransactionTable', vThresholds = vaLastTransactionThresholds, sColumnIndex = sLastTransactionThresholdOrderColumnIndex);
showTickerInfo(dictTickerInfo = dictLastTransaction, sTickerContainer = 'LastTransactionTableContainer', sTableId = 'lastTransactionTable', iaRound = iaLastTransactionRound, iaFactor = iaLastTransactionFactor);
$(document).ready(function () { $('#lastTransactionTable').DataTable({ "order": [[iLastTransactionThresholdOrderColumnIndex, 'asc']] }); });

vaTransactionsTableThresholds = [
    { class: 'blue', value: 5. },
    { class: 'lightblue', value: 3. },
    { class: 'green', value: 1. },
    { class: 'lightgreen', value: 0. },
    { class: 'yellow', value: -2. },
    { class: 'red', value: -100. }
];
iTransactionsTableThresholdOrderColumnIndex = 2;
sTransactionsTableThresholdOrderColumnIndex = "" + iTransactionsTableThresholdOrderColumnIndex;
iaTransactionsRound = [null, null, 2, null, 2, 0, 2];
iaTransactionsFactor = [null, null, null, null, null, null, 100];

vaBriefSummaryTableThresholds = [
    { class: 'blue', value: 1. },
    { class: 'lightblue', value: 0.5 },
    { class: 'green', value: 0.2 },
    { class: 'lightgreen', value: 0.1 },
    { class: 'yellow', value: -0.2 },
    { class: 'red', value: -100. }
];
iBriefSummaryTableThresholdOrderColumnIndex = 9;
sBriefSummaryTableThresholdOrderColumnIndex = "" + iBriefSummaryTableThresholdOrderColumnIndex;
iaBriefSummaryRound = [null, null, 2, 2, 2, null, 2, 2, 4, 4, 2, 2];
iaBriefSummaryFactor = [null, null, null, null, 100, null, 100, 100, 100, 100, 100, 100];

vaDetailSummaryTableThresholds = [
    { class: 'blue', value: 1. },
    { class: 'lightblue', value: 0.5 },
    { class: 'green', value: 0.2 },
    { class: 'lightgreen', value: 0.1 },
    { class: 'yellow', value: -0.2 },
    { class: 'red', value: -100. }
];
iDetailSummaryTableThresholdOrderColumnIndex = 1;
sDetailSummaryTableThresholdOrderColumnIndex = "6";
iaDetailSummaryRound = [null, null, 2, 2, 2, null, 2, 4, 4];
iaDetailSummaryFactor = [null, null, null, null, 100, null, 100, 100, 100];

vaLastSoldTableThresholds = [
    { class: 'blue', value: 5. },
    { class: 'lightblue', value: 3. },
    { class: 'green', value: 1. },
    { class: 'lightgreen', value: 0. },
    { class: 'yellow', value: -2. },
    { class: 'red', value: -100. }
];
iLastSoldTableThresholdOrderColumnIndex = 6;
sLastSoldTableThresholdOrderColumnIndex = "" + iLastSoldTableThresholdOrderColumnIndex;
iaLastSoldRound = [null, 2, null, 2, 0, 2];
iaLastSoldFactor = [null, null, null, null, null, 100];
showTickerInfo(dictTickerInfo = dictLastBuySell, sTickerContainer = 'lastSoldTableContainer', sTableId = 'lastSoldTable', iaRound = iaLastSoldRound, iaFactor = iaLastSoldFactor);
cellMoreColor(sTableName = 'lastSoldTable', vThresholds = vaLastSoldTableThresholds, sColumnIndex = sLastSoldTableThresholdOrderColumnIndex);
$(document).ready(function () { $('#lastSoldTable').DataTable({ "order": [[iLastSoldTableThresholdOrderColumnIndex, 'desc']] }); });

document.body.style.zoom = "190%";
showTabOnHover('TickerTab');
window.onload = populateTickerSelector;
showAnalysisTableInfo(dictTotalsSummary, 'homeTableContainer');

document.getElementById("buyComments").innerHTML = '<b>(' + dictTotalsSummary["CloseDate"] + ') Next Day Buy Signal</b>: If the price drops below the buy price and then rises to that price then buy.';
document.getElementById("sellComments").innerHTML = '<b>(' + dictTotalsSummary["ClosoeDate"] + ') Next Day Sell Signal</b>: If the price drops below the sell price and then rises to that price then sell.';

document.getElementById("buyHint").innerHTML =
    'Signals were completed end of trade day: <b>(' + dictTotalsSummary["CloseDate"] + ')</b>. Below are ' + Object.keys(dictBuyTickerInfo['Data']).length + ' potential trades.<br>' +
    'The buy conditions were refreshed at <b>' + dictTotalsSummary["RefreshTimestamp"].substring(0, 19) + ' PST</b> and take effect the next trade day.<br>' +
    'If the price drops below the suggested buy price and then rises to or above that price then the buy conditions are satisfied'
document.getElementById("sellHint").innerHTML =
    'Signals were completed end of trade day: <b>(' + dictTotalsSummary["CloseDate"] + ')</b>. Below are ' + Object.keys(dictSellTickerInfo['Data']).length + ' potential trades.<br>' +
    'The sell conditions were refreshed at <b>' + dictTotalsSummary["RefreshTimestamp"].substring(0, 19) + ' PST</b> and take effect the next trade day.<br>' +
    'If the price drops at or below the suggested sell price then the sell conditions are satisfied.'
document.getElementById("tickerHint").innerHTML =
    '' + saTicker.length + ' Tickers were chosen in 2020.  The signals have been back tested since <b>' + dictTotalsSummary["StartDate"] + '</b>.<br>' +
    'Most of these securities have a minimum volume of one million shares a day.  This ensures liquidity.<br>' +
    'The charts compare returns for a security if it is held, if one executes the suggested trades, and also if one maintains a diversified portfolio.'

document.getElementById("LastRefresh").innerHTML = dictTotalsSummary["RefreshTimestamp"].substring(0, 19) + ' PST'