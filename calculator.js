new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    methods: {
        setStep(step) {
            this.currentStep = step;
            // if (step <= this.currentStep) {}
        },
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
            return this.incomeBasedTotalProfit() / this.incomeBasedTotalRevenue()
        },

        budgetBasedNumberOfLeads() {
            return Math.floor(
                this.budget / this.costPerLead
            )
        },
        budgetBasedNumberOfBookings() {
            return Math.floor(
                this.budgetBasedNumberOfLeads() * this.leadToBookedCallRate
            )
        },
        budgetBasedNumberOfCalls() {
            return Math.floor(
                this.budgetBasedNumberOfBookings() * this.bookedToCompletedCallRate
            )
        },
        budgetBasedNumberOfClients() {
            return Math.floor(this.budgetBasedNumberOfCalls() * this.callToClientEnrolledRate)
        },

        budgetBasedTotalRevenue() {
            return this.budgetBasedNumberOfClients() * this.productPrice
        },

        budgetBasedTotalAdvertisingCost() {
            return this.budget
        },

        budgetBasedMaxCostPerLead() {
            return this.budgetBasedTotalAdvertisingCost() / this.budgetBasedNumberOfLeads()
        },
        budgetBasedMaxCostPerBookedCall() {
            return this.budgetBasedTotalAdvertisingCost() / this.budgetBasedNumberOfBookings()
        },
        budgetBasedMaxCostPerCompletedCall() {
            return this.budgetBasedTotalAdvertisingCost() / this.budgetBasedNumberOfCalls()
        },
        budgetBasedMaxCostPerClient() {
            return this.budgetBasedTotalAdvertisingCost() / this.budgetBasedNumberOfClients()
        },
        budgetBasedROAS() {
            return this.budgetBasedTotalRevenue() / this.budgetBasedTotalAdvertisingCost()
        },
        budgetBasedTotalConversionRate() {
            return this.budgetBasedNumberOfClients() / this.budgetBasedNumberOfLeads()
        },
        budgetBasedTotalProfit() {
            return (
                this.budgetBasedTotalRevenue() -
                this.budgetBasedTotalAdvertisingCost()
            )
        },
        budgetBasedTotalGrossMargin() {
            return this.budgetBasedTotalProfit() / this.budgetBasedTotalRevenue()
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
                    label: 'Revenue',
                    value: `$${parseFloat(this.totalRevenue).toFixed(2)}`,
                    icon: 'mdi-cash-multiple'
                },
                {
                    label: 'Clients',
                    value: this.totalEnrolled,
                    icon: 'mdi-account-check'
                },
                {
                    label: 'Calls',
                    value: this.totalShowedUp,
                    icon: 'mdi-phone-in-talk'
                },
                {
                    label: 'Appointments',
                    value: this.totalDiscoveryCalls,
                    icon: 'mdi-calendar-clock'
                },
                {
                    label: 'Leads',
                    value: this.totalLeads,
                    icon: 'mdi-account-multiple'
                },
                {
                    label: 'Ad Budget',
                    value: `$${parseFloat(this.totalAdvertisingCost).toFixed(2)}`,
                    icon: 'mdi-cash'
                },
                {
                    label: 'Ad Cost per Client',
                    value: `$${parseFloat(this.maxCostPerClient).toFixed(2)}`,
                    icon: 'mdi-account-check'
                },
                {
                    label: 'Ad Cost per Call',
                    value: `$${parseFloat(this.maxCostPerCompletedCall).toFixed(2)}`,
                    icon: 'mdi-phone-in-talk'
                },
                {
                    label: 'Ad Cost per Booking',
                    value: `$${parseFloat(this.maxCostPerBookedCall).toFixed(2)}`,
                    icon: 'mdi-calendar-clock'
                },
                {
                    label: 'Ad Cost per Lead',
                    value: `$${parseFloat(this.maxCostPerLead).toFixed(2)}`,
                    icon: 'mdi-account-multiple'
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
                    label: 'Gross Margin',
                    value: `${parseFloat(this.totalGrossMargin * 100).toFixed(2)}%`,
                    icon: 'mdi-chart-bar'
                },
                {
                    label: 'Gross Profit',
                    value: `$${parseFloat(this.totalProfit).toFixed(2)}`,
                    icon: 'mdi-cash-plus'
                }
            ]
        }
    },
    data() {
        return {
            currentStep: 1,
            totalSteps: 5,
            calculationMode: "income",

            productPrice: 3500,

            incomeGoal: 10000,
            profitMargin: 0.3,

            budget: 1000,
            costPerLead: 5,

            leadToBookedCallRate: 0.05,
            bookedToCompletedCallRate: 0.7,
            callToClientEnrolledRate: 0.2,
        }
    },
})