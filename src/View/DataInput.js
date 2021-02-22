import React from 'react';
import axios from 'axios';
import Loading from '../Component/Loading';

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_state: '有期雇用',
      loading_flag: false,
    };
    // bindしないと「setState」が「undefind」になる
    // https://tossy-yukky.hatenablog.com/entry/2016/01/15/185338
    this.handleChange = this.handleChange.bind(this);
    this.btnAction = this.btnAction.bind(this);
  }

  btnAction = () => {
    console.log('========action');
    // console.log('========action');
    // console.log(document.getElementsByName('unit_price')[0].value);
    // console.log(document.getElementsByName('officer_amount')[0].value);
    // console.log(document.getElementsByName('resident_tax')[0].value);
    // console.log(document.getElementsByName('transportation_expenses')[0].value);
    // console.log(document.getElementsByName('performance_salary')[0].value);
    // console.log(document.getElementsByName('dependents')[0].value);
    // console.log(document.getElementsByName('age')[0].value);
    // console.log(document.getElementsByName('employment_status')[0].value);

    this.setState({
      loading_flag: true
    });

    if (document.getElementsByName('employment_status')[0].value === '役員') {
      this.PayRoll(
        document.getElementsByName('unit_price')[0].value,
        document.getElementsByName('officer_amount')[0].value,
        document.getElementsByName('resident_tax')[0].value,
        document.getElementsByName('transportation_expenses')[0].value,
        document.getElementsByName('performance_salary')[0].value,
        document.getElementsByName('dependents')[0].value,
        document.getElementsByName('age')[0].value,
        document.getElementsByName('employment_status')[0].value,
      );
    } else {
      this.PayRoll(
        document.getElementsByName('unit_price')[0].value,
        0,
        document.getElementsByName('resident_tax')[0].value,
        document.getElementsByName('transportation_expenses')[0].value,
        document.getElementsByName('performance_salary')[0].value,
        document.getElementsByName('dependents')[0].value,
        document.getElementsByName('age')[0].value,
        document.getElementsByName('employment_status')[0].value,
      );
    }
  }

  PayRoll = (
    unit_price,
    officer_amount,
    resident_tax,
    transportation_expenses,
    performance_salary,
    dependents,
    age,
    employment_status,
  ) => {
    axios.get('https://script.google.com/a/macros/reigle.jp/s/AKfycby_H3DypM98ApQ7zt3lTtEJ37o20UE70g5FQNwr_o7HLQ3Ih0LATR12/exec', {
      params: {
        unit_price,
        officer_amount,
        resident_tax,
        transportation_expenses,
        performance_salary,
        dependents,
        age,
        employment_status,
      }
    }).then(res => {
      console.log('==========11');
      console.log(res);
      console.log(res.data);
      console.log(res.data.result);
      this.props.history.push({
        pathname: '/Result',
        state: {
          base_salary: res.data.result.base_salary,
          commuting_salary: res.data.result.commuting_salary,
          employment_insurance: res.data.result.employment_insurance,
          fixed_midnight_surcharge_salary: res.data.result.fixed_midnight_surcharge_salary,
          fixed_overtime_salary: res.data.result.fixed_overtime_salary,
          health_insurance: res.data.result.health_insurance,
          income_tax: res.data.result.income_tax,
          job_salary: res.data.result.job_salary,
          long_term_care_insurance: res.data.result.long_term_care_insurance,
          officer_salary: res.data.result.officer_salary,
          outcome_salary: res.data.result.outcome_salary,
          resident_tax: res.data.result.resident_tax,
          take_home_payment: res.data.result.take_home_payment,
          total_payment: res.data.result.total_payment,
          welfare_pension: res.data.result.welfare_pension,
          employment_status: document.getElementsByName('employment_status')[0].value,
        }
      });
    });
  }

  handleChange(e) {
    this.setState({
      emp_state: e.target.value
    });
  }

  render() {
    return(
      <div>
        雇用形態：<select name="employment_status" onChange={this.handleChange}>
          <option value="有期雇用">有期雇用</option>
          <option value="正社員">正社員</option>
          <option value="役員">役員</option>
        </select><br/>

        現場単価：<input type="number" name="unit_price" value="0" /><br/>
        
        {
          this.state.emp_state === '役員' &&
            <div>役員報酬額：<input type="number" name="officer_amount" value="0" /><br/></div>
        }
        
        住民税：<input type="number" name="resident_tax" value="0" /><br/>
        交通費：<input type="number" name="transportation_expenses" value="0" /><br/>
        成果給：<input type="number" name="performance_salary" value="0" /><br/>
        扶養人数：<select name="dependents">
          <option value="0人">0人</option>
          <option value="1人">1人</option>
          <option value="2人">2人</option>
          <option value="3人">3人</option>
          <option value="4人">4人</option>
          <option value="5人">5人</option>
          <option value="6人">6人</option>
          <option value="7人">7人</option>
        </select><br/>
        年齢：<select name="age">
          <option value="40歳未満">40歳未満</option>
          <option value="40歳以上">40歳以上</option>
        </select><br/>
        
        <button onClick={this.btnAction}>ボタン</button>
        { this.state.loading_flag && <Loading />}
      </div>
    )
  }
}


export default DataInput;