var steps = [{
        index: 1,
        text: "<b>Colorado PERA: Unfunded Pension Promises </b>● Colorado offers pension benefits to teachers, state employees, local employees, judges, and other public workers. In 2000, the state reported these pensions were fully funded. Since then, however, Colorado has experienced a surge in pension debt (known as unfunded liabilities). At the end of 2016, Colorado reported the difference between the dollars saved to pay pensions and the pensions it had promised was about $32 billion.",
        below_text: 'Source: Colorado PERA Comprehensive Annual Financial Reports, actuarial accounting basis',
        subTitle: "All Divisions Combined, including Denver Public Schools",
        additional_note: '',//'Colorado offers pension benefits to teachers, state employees, local employees, judges, and other public workers. In 2000, the state reported these pensions were fully funded. Since then, however, Colorado has experienced a surge in pension debt (known as unfunded liabilities). At the end of 2016, Colorado reported the difference between the dollars saved to pay pensions and the pensions it had promised was about $32 billion.',
        dots: undefined
    },
    {
        index: 2,
        text: "At the end of 2016, Colorado PERA reported that the value in today's dollars of all future promised pensions was an estimated $77 billion. But assets available to pay for these benefits are only $45 billion. This means Colorado PERA has $32 billion in unfunded pension promises.",
        below_text: '',
        subTitle: '',
        dots: undefined,
        dots: 930,
        color: clr[0]
    },
    {
        index: 3,
        text: "Most stories about Colorado PERA's pension debt focus on the failure of the legislature to pay the bills...",
        below_text: 'Since 1996, state statutes that determine how much will be paid from public employers have short changed the PERA pension fund by nearly $4.6 billion, compared to what actuaries have recommended be paid.',
        subTitle: '',
        dots: 49,
        start: 550,
        color: clr[6]
    },
    {
        index: 4,
        text: "...but more than half of the pension debt comes from the failure of the actuarial assumptions in the past to predict the future.",
        below_text: 'Since 1996, nearly $20 billion in unfunded liabilities have accrued due to actual experience differing from actuarial assumptions, such as people living longer and investment returns being lower than anticipated.',
        subTitle: '',
        dots: 200,
        color: clr[2]
    },
    {
        index: 5,
        text: "Most of the growth in pension debt comes from investment returns underperforming relative to assumptions.",
        below_text: 'Since 1996, actual investments returns have been below the assumed return, which has varied from 8.75% to 7.25%. This resulted in more than $8 billion being added to unfunded liabilities.',
        subTitle: '',
        colors: {
            0: clr[3],
            85: clr[2]
        },
        dots: 200,
        fade: 0,
        color: clr[4],
        fade_color: clr[3]
    },
    {
        index: 6,
        text: "And other failed assumptions carry their own share of the blame for pension debt.",
        below_text: 'There is a consistent pattern of actual experience differing from the assumptions about the future that actuaries used to estimate the costs of funding PERA. Since 1996, mistakes with things like estimating mortality rates or when people will quit have resulted in $7.7 billion being added to unfunded liabilities.',
        colors: {
            0: clr[3],
            85: clr[4],
            162: clr[2]
        },
        subTitle: '',
        dots: 200,
        fade: 162,
        color: '#3000D1',
        fade_color: '#A285FF'
    },
    {
        index: 7,
        text: "Plus, when assumptions do get changed to be more accurate, this means recognizing pension debt that wasn't accounted for in the past.",
        below_text: 'Changes to assumptions and methods resulted in a recognition of an additional $3.8 billion in unfunded liabilities since 1996. Changes to assumptions do not create more unfunded liabilities, even though the reported amount increases. Rather, changes to assumptions change the accounting of unfunded liabilities, effectively recognizing pension debt that existed but was not recorded on the books.',
        subTitle: '',
        colors: {
            0: clr[3],
            85: clr[4],
            162: clr[5]
        },
        dots: 200,
        fade: 162,
        color: '#3000D1',
        fade_color: '#25009E'
    },
    {
        index: 8,
        text: "The rest of pension debt comes from bad contribution rate policy.",
        below_text: 'Since 1996, contribution rate deficiency and negative amortization have collectively caused an $11 billion in unfunded liabilities.',
        subTitle: '',
        dots: 110,
        related_step: 7,
        color: clr[6]
    },
    {
        index: 9,
        text: "A lot of that is due to just interest on the debt, Colorado's pension debt payments are often less than the interest accruing on the debt.",
        below_text: 'Colorado reports a category of actuarial loss called "expected change in unfunded liability" which reflects the fact that unfunded liability amortization payments into PERA are occasionally less than the interest that accrues annually on unfunded liabilities. Effectively, this is negative amortization of the unfunded liability. Negative amortization had added $6.5 billion in unfunded liabilities since 1996.',
        subTitle: '',
        colors: {
            200: clr[7],
            265: clr[6]
        },
        dots: 110,
        related_step: 7,
        fade: 0,
        color: '#E07600',
        fade_color: '#FFA747'
    },
    {
        index: 10,
        text: "And the rest of the pension debt caused by contribution rate policy is because the public employer payments dictated by Colorado statutes are typically less than enough to properly fund the system. Or more simply, the legislature isn't authorizing public employers to fully pay the bill for providing pensions.",
        below_text: "PERA uses statutorily determined contribution rates that are disconnected from the actuarially determined employer contribution rates. Fixed annual employee and employer contributions are supplemented with additional employer contributions (known as the AED and SAED) intended to help pay down unfunded liabilities. These statutory contribution rates have not kept pace, though, with actuarially determined rates, leading to 'contribution rate deficiency.'",
        subTitle: '',
        colors: {
            200: clr[7],
            265: clr[8]
        },
        dots: 110,
        related_step: 7,
        fade: 0,
        color: '#E07600',
        fade_color: '#FD8E12'
    },
    {
        index: 11,
        text: "Oh, and based on the accounting practices recommended by the Government Accounting Standards Board, the total amount of Colorado pension debt is probably closer to $50 billion.",
        below_text: "PERA reports its unfunded liability based on the actuarial value of assets and the actuarial accrued liability based on the plan's discount rate. However, based on current contribution rate policies, the State, Schools, and Judges divisions are anticipated to run out of cash within the next three decades. As a result, under GASB accounting rules, PERA is required to report its accrued liability based on a lower discount rate (known as the 'total pension liability'). Under GASB 68 accounting rules, the total net pension liability - effectively another term for the unfunded pension liability - was estimated to be $50 billion by the end of 2016.",
        subTitle: '',
        dots: 500,
        color: clr[9],
        expand: 180
    },
];
