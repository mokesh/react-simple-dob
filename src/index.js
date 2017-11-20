import React from 'react';

/**
 * React DOB Component without Calendar
 *
 * @author Mukesh Sharma <cogentmukesh@gmail.com>
 * @class SimpleDOB
 */
class SimpleDOB extends React.Component {
    /**
     * @constructs SimpleDOB
     * @param {Object} props 
     * @param {number} minAgeLimit Minimum age to validate
     * @param {number} maxAgeLimit Maximum age to validate
     */
    constructor(props, e,  minAgeLimit = 18, maxAgeLimit = 65) {
        super(props);

        // Max Age to Allow 
        this.maxAge = new Date().getFullYear() - maxAgeLimit;
        // Min Age requirement 
        this.minAge = new Date().getFullYear() - minAgeLimit;

        // Collection of DOB Elements
        this.elems = [];
    }

    componentDidMount() {
        // Error Validation Flag
        // This flag can enable UX Error handling
        this.setState({isError: false});
    }
    
    /**
     * Keep a tab of Day-Field KeyUp Change
     */
    onDayKeyUp (e) {
        const dobDayValue = e.target.value;
        const re = /^[0-9\b]+$/;

        if (false === (dobDayValue == '' || re.test(dobDayValue))) {
            e.target.value = '';
        } else if(dobDayValue.length == 2){
            // Move to Next Field i.e. Month
            this.elems.mm.focus();   
        }
        // Keep validating on every key storke. 
        // TODO: Need to optimize this
        this.validateDOB(this.elems.dd.value, this.elems.mm.value, this.elems.yy.value); 
    }
    
    /**
     * Keep a tab of Month-Field KeyUp Change
     */
    onMonthKeyUp (e) {
        const dobMonthValue = e.target.value;
        const re = /^[0-9\b]+$/;

        if (false === (dobMonthValue == '' || re.test(dobMonthValue))) {
            e.target.value = '';
        } else if(dobMonthValue.length == 2){
            // Move to Next Field i.e. Year
            this.elems.yy.focus();   
        }
        this.validateDOB(this.elems.dd.value, this.elems.mm.value, this.elems.yy.value); 
    }
    
    /**
     * Keep a tab of Month-Field KeyUp Change
     */
    onYearKeyUp (e) {
        const dobYearValue = e.target.value;
        if(dobYearValue.length == 4){
           this.validateDOB(this.elems.dd.value, this.elems.mm.value, this.elems.yy.value); 
        }
    }

    /**
     * Wrapper method to validate date
     * @returns {boolean}
     */
    validate() {
        return this.validateDOB(this.elems.dd.value, this.elems.mm.value, this.elems.yy.value);
    }
    
    /**
     * The Actual Validator 
     *   - validates Leap Year
     *   - 30/31 Day
     *   - Min/Max Age limitation
     *
     * @param {number|string} day
     * @param {number|string} month
     * @param {number|string} year
     *
     * @returns {boolean}
     */
    validateDOB (day, month, year) {
        // Initialize the error State
        this.setState({ isError : false });

        try {
            if (isNaN(parseInt(day)) === false && isNaN(parseInt(month)) === false && isNaN(parseInt(year)) === false) {

                if ((month < 1) || (month > 12)) throw false;
                else if((day < 1) || (day > 31)) throw false;
                else if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) throw false;
                else if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) throw false;
                else if((month == 2) && ((year % 100) == 0) && (day > 29)) throw false;
                else if((month == 2) && (day > 28)) throw false;
                else if(year < this.maxAge || year > this.minAge) throw false;

            } else {
                this.setState({ isError : true });
            }
        } catch (e) {
            // This might get tricky If there are other Exceptions
            // TODO: need to Define SimpleDobExceptions
            this.setState({ isError : true });
        }

        return !this.state.isError;
    }

    /**
     * Callback Hook for Caller
     * @callback onChange ~ 
     *
     * @returns {Object} e - Event
     * @returns {Object} Date - Standard Date Object
     */
    postCallback (e) {
        const {onChange} = this.props;

        if (this.validateDOB(this.elems.dd.value, this.elems.mm.value, this.elems.yy.value) === true) {
            // Hit the Callback
            // Integer value representing the month, beginning with 0 for January to 11 for December.
            // @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|Mozilla}
            onChange(e, { dob : new Date(this.elems.yy.value, (this.elems.mm.value - 1), this.elems.dd.value)});
        }
    }

    render (customErrorEl = null) {
        // Validation Element
        let errorElement = '';

        if (this.state != null && this.state.isError === true) {
            errorElement = (customErrorEl === null) ? <div>{this.props.errorMessage}</div> : customErrorEl;
        }

        return (
            <div>
                <div id="sd-dob-container">
                    <input 
                        id="sd-birth-day"  
                        placeholder="dd"    
                        name="birth-day"   
                        maxLength="2" 
                        required="" 
                        type="tel" 
                        onKeyUp={this.onDayKeyUp.bind(this)} 
                        onBlur = {this.postCallback.bind(this)}
                        ref={ function(node){ this.elems.dd = node; }.bind(this) }
                    />
                    <span>/</span>
                    <input 
                        id="sd-birth-month" 
                        placeholder="mm"    
                        name="birth-month" 
                        maxLength="2" 
                        required="" 
                        type="tel" 
                        onKeyUp={this.onMonthKeyUp.bind(this)} 
                        onBlur = {this.postCallback.bind(this)}
                        ref={ function(node){ this.elems.mm = node; }.bind(this) }
                    />
                    <span>/</span>
                    <input id="sd-birth-year"  
                        placeholder="yyyy"  
                        name="birth-year"  
                        maxLength="4" 
                        required="" 
                        type="tel" 
                        onKeyUp={this.onYearKeyUp.bind(this)} 
                        onBlur = {this.postCallback.bind(this)}
                        ref={ function(node){ this.elems.yy = node; }.bind(this) }
                    />
                </div>
                {errorElement}
            </div>
        );
    }
}
export default SimpleDOB;
