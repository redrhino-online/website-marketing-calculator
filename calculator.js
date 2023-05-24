new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            currentStep: 2,
            calculationMode: "income",

            productPrice: 1000,

            incomeGoal: 10000,
            profitMargin: 0.3,

            budget: 1000,
            costPerLead: 5,

            leadToBookedCallRate: 0.05,
            bookedToCompletedCallRate: 0.7,
            callToClientEnrolledRate: 0.2,
        }
    },
    methods: {
        incomeBasedMaxCostPerClient() {
            return this.productPrice * (1 - this.profitMargin)
        },
        incomeBasedMaxCostPerCompletedCall() {
            return (
                this.incomeBasedMaxCostPerClient() * this.callToClientEnrolledRate
            )
        },
        incomeBasedMaxCostPerBookedCall() {
            return (
                this.incomeBasedMaxCostPerCompletedCall() *
                this.bookedToCompletedCallRate
            )
        },
        incomeBasedMaxCostPerLead() {
            return (
                this.incomeBasedMaxCostPerBookedCall() * this.leadToBookedCallRate
            )
        },
        incomeBasedNumberOfClients() {
            return Math.floor(
                this.incomeGoal / (this.productPrice * this.profitMargin)
            )
        },
        incomeBasedNumberOfCalls() {
            return Math.ceil(
                this.incomeBasedNumberOfClients() / this.callToClientEnrolledRate
            )
        },
        incomeBasedNumberOfBookings() {
            return Math.ceil(
                this.incomeBasedNumberOfCalls() / this.bookedToCompletedCallRate
            )
        },
        incomeBasedNumberOfLeads() {
            return Math.ceil(
                this.incomeBasedNumberOfBookings() / this.leadToBookedCallRate
            )
        },
        incomeBasedTotalRevenue() {
            return this.incomeBasedNumberOfClients() * this.productPrice
        },
        incomeBasedTotalAdvertisingCost() {
            return (
                this.incomeBasedMaxCostPerLead() * this.incomeBasedNumberOfLeads()
            )
        },
        incomeBasedTotalProfit() {
            return (
                this.incomeBasedTotalRevenue() -
                this.incomeBasedTotalAdvertisingCost()
            )
        },
        incomeBasedROAS() {
            return this.incomeBasedTotalRevenue() / this.incomeBasedTotalAdvertisingCost()
        },
        incomeBasedTotalConversionRate() {
            return this.incomeBasedNumberOfClients() / this.incomeBasedNumberOfLeads()
        },
        incomeBasedTotalGrossMargin() {
            return this.incomeBasedTotalProfit() / this.incomeBasedTotalAdvertisingCost()
        },


        budgetBasedMaxCostPerClient() {
            return this.budget * this.profitMargin
        },
        budgetBasedMaxCostPerCompletedCall() {
            return (
                this.budgetBasedMaxCostPerClient() / this.callToClientEnrolledRate
            )
        },
        budgetBasedMaxCostPerBookedCall() {
            return (
                this.budgetBasedMaxCostPerCompletedCall() /
                this.bookedToCompletedCallRate
            )
        },
        budgetBasedMaxCostPerLead() {
            return (
                this.budgetBasedMaxCostPerBookedCall() / this.leadToBookedCallRate
            )
        },
        budgetBasedNumberOfClients() {
            return Math.floor(this.budget / this.budgetBasedMaxCostPerClient())
        },
        budgetBasedNumberOfCalls() {
            return Math.ceil(
                this.budgetBasedNumberOfClients() / this.callToClientEnrolledRate
            )
        },
        budgetBasedNumberOfBookings() {
            return Math.ceil(
                this.budgetBasedNumberOfCalls() / this.bookedToCompletedCallRate
            )
        },
        budgetBasedNumberOfLeads() {
            return Math.ceil(
                this.budgetBasedNumberOfBookings() / this.leadToBookedCallRate
            )
        },
        budgetBasedTotalRevenue() {
            return this.budgetBasedNumberOfClients() * this.productPrice
        },
        budgetBasedTotalAdvertisingCost() {
            return this.budget
        },
        budgetBasedTotalProfit() {
            return (
                this.budgetBasedTotalRevenue() -
                this.budgetBasedTotalAdvertisingCost()
            )
        },
        budgetBasedROAS() {
            return this.budgetBasedTotalRevenue() / this.budgetBasedTotalAdvertisingCost()
        },
        budgetBasedTotalConversionRate() {
            return this.incomeBasedNumberOfClients() / this.incomeBasedNumberOfLeads()
        },
        budgetBasedTotalConversionRate() {
            return this.budgetBasedNumberOfClients() / this.budgetBasedNumberOfLeads()
        },
        budgetBasedTotalGrossMargin() {
            return this.budgetBasedTotalProfit() / this.budgetBasedTotalAdvertisingCost()
        },

    },
    computed: {
        strategies() {
            return {
                income: {
                    totalLeads: this.incomeBasedNumberOfLeads,
                    totalDiscoveryCalls: this.incomeBasedNumberOfBookings,
                    totalShowedUp: this.incomeBasedNumberOfCalls,
                    totalEnrolled: this.incomeBasedNumberOfClients,
                    totalRevenue: this.incomeBasedTotalRevenue,
                    totalAdvertisingCost: this.incomeBasedTotalAdvertisingCost,
                    totalProfit: this.incomeBasedTotalProfit,
                    maxCostPerClient: this.incomeBasedMaxCostPerClient,
                    maxCostPerCompletedCall: this
                        .incomeBasedMaxCostPerCompletedCall,
                    maxCostPerBookedCall: this.incomeBasedMaxCostPerBookedCall,
                    maxCostPerLead: this.incomeBasedMaxCostPerLead,
                    ROAS: this.incomeBasedROAS,
                    totalConversionRate: this.incomeBasedTotalConversionRate,
                    totalGrossMargin: this.incomeBasedTotalGrossMargin,
                },
                budget: {
                    totalLeads: this.budgetBasedNumberOfLeads,
                    totalDiscoveryCalls: this.budgetBasedNumberOfBookings,
                    totalShowedUp: this.budgetBasedNumberOfCalls,
                    totalEnrolled: this.budgetBasedNumberOfClients,
                    totalRevenue: this.budgetBasedTotalRevenue,
                    totalAdvertisingCost: this.budgetBasedTotalAdvertisingCost,
                    totalProfit: this.budgetBasedTotalProfit,
                    maxCostPerClient: this.budgetBasedMaxCostPerClient,
                    maxCostPerCompletedCall: this
                        .budgetBasedMaxCostPerCompletedCall,
                    maxCostPerBookedCall: this.budgetBasedMaxCostPerBookedCall,
                    maxCostPerLead: this.budgetBasedMaxCostPerLead,
                    ROAS: this.budgetBasedROAS,
                    totalConversionRate: this.budgetBasedTotalConversionRate,
                    totalGrossMargin: this.budgetBasedTotalGrossMargin,
                }
            }
        },
        totalLeads() {
            return this.strategies[this.calculationMode].totalLeads()
        },
        totalDiscoveryCalls() {
            return this.strategies[this.calculationMode].totalDiscoveryCalls()
        },
        totalShowedUp() {
            return this.strategies[this.calculationMode].totalShowedUp()
        },
        totalEnrolled() {
            return this.strategies[this.calculationMode].totalEnrolled()
        },
        totalRevenue() {
            return this.strategies[this.calculationMode].totalRevenue()
        },
        totalAdvertisingCost() {
            return this.strategies[this.calculationMode].totalAdvertisingCost()
        },
        totalProfit() {
            return this.strategies[this.calculationMode].totalProfit()
        },
        maxCostPerClient() {
            return this.strategies[this.calculationMode].maxCostPerClient()
        },
        maxCostPerCompletedCall() {
            return this.strategies[this.calculationMode].maxCostPerCompletedCall()
        },
        maxCostPerBookedCall() {
            return this.strategies[this.calculationMode].maxCostPerBookedCall()
        },
        maxCostPerLead() {
            return this.strategies[this.calculationMode].maxCostPerLead()
        },
        ROAS() {
            return this.strategies[this.calculationMode].ROAS()
        },
        totalConversionRate() {
            return this.strategies[this.calculationMode].totalConversionRate()
        },
        totalGrossMargin() {
            return this.strategies[this.calculationMode].totalGrossMargin()
        },
        results() {
            return [
                {
                    label: 'Total Leads',
                    value: this.totalLeads,
                    icon: 'mdi-account-multiple'
                },
                {
                    label: 'Calls Booked',
                    value: this.totalDiscoveryCalls,
                    icon: 'mdi-phone'
                },
                {
                    label: 'Calls Completed',
                    value: this.totalShowedUp,
                    icon: 'mdi-account-check'
                },
                {
                    label: 'Clients Enrolled',
                    value: this.totalEnrolled,
                    icon: 'mdi-account-arrow-right'
                },
                {
                    label: 'Top Line Revenue',
                    value: `$${parseFloat(this.totalRevenue).toFixed(2)}`,
                    icon: 'mdi-cash-multiple'
                },
                {
                    label: 'Ad Cost Total',
                    value: `$${parseFloat(this.totalAdvertisingCost).toFixed(2)}`,
                    icon: 'mdi-cash'
                },
                {
                    label: 'Ad Cost per Call',
                    value: `$${parseFloat(this.maxCostPerCompletedCall).toFixed(2)}`,
                    icon: 'mdi-cash'
                },
                {
                    label: 'Ad Cost per Client',
                    value: `$${parseFloat(this.maxCostPerClient).toFixed(2)}`,
                    icon: 'mdi-cash-minus'
                },
                {
                    label: 'ROAS',
                    value: `${parseFloat(this.ROAS).toFixed(2)}%`,
                    icon: 'mdi-chart-line'
                },
                {
                    label: 'Overall Conversion Rate',
                    value: `${parseFloat(this.totalConversionRate * 100).toFixed(2)}%`,
                    icon: 'mdi-chart-pie'
                },
                {
                    label: 'Gross Profit',
                    value: `$${parseFloat(this.totalProfit).toFixed(2)}`,
                    icon: 'mdi-cash-plus'
                },
                {
                    label: 'Gross Margin',
                    value: `${parseFloat(this.totalGrossMargin).toFixed(2)}%`,
                    icon: 'mdi-chart-bar'
                }
            ]
        }
    }
})