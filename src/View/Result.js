import React from 'react'

class Result extends React.Component {
  render(){
    return(
      <div>
        {this.props.location.state.employment_status === '役員' &&
          <div>
            <p>役員報酬：{this.props.location.state.officer_salary}</p>
            <p>健康保険：{this.props.location.state.health_insurance}</p>
            <p>所得税：{this.props.location.state.income_tax}</p>
            <p>業務手当：{this.props.location.state.job_salary}</p>
            <p>介護保険：{this.props.location.state.long_term_care_insurance}</p>
            <p>住民税：{this.props.location.state.resident_tax}</p>
            <p>手取り：{this.props.location.state.take_home_payment}</p>
            <p>総支給：{this.props.location.state.total_payment}</p>
            <p>厚生年金：{this.props.location.state.welfare_pension}</p>
          </div>
        }
        {this.props.location.state.employment_status !== '役員' &&
          <div>
            <p>基本給：{this.props.location.state.base_salary}</p>
            <p>通勤手当：{this.props.location.state.commuting_salary}</p>
            <p>雇用保険：{this.props.location.state.employment_insurance}</p>
            <p>固定深夜割増手当：{this.props.location.state.fixed_midnight_surcharge_salary}</p>
            <p>固定残業手当：{this.props.location.state.fixed_overtime_salary}</p>
            <p>健康保険：{this.props.location.state.health_insurance}</p>
            <p>所得税：{this.props.location.state.income_tax}</p>
            <p>業務手当：{this.props.location.state.job_salary}</p>
            <p>介護保険：{this.props.location.state.long_term_care_insurance}</p>
            <p>成果給：{this.props.location.state.outcome_salary}</p>
            <p>住民税：{this.props.location.state.resident_tax}</p>
            <p>手取り：{this.props.location.state.take_home_payment}</p>
            <p>総支給：{this.props.location.state.total_payment}</p>
            <p>厚生年金：{this.props.location.state.welfare_pension}</p>
          </div>
        }
      </div>
    )
  }
}


export default Result;