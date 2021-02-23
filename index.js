
$(function() {
  var employmentStatus = '有期雇用';
  var result = {};

  initAction()
  testMode()

  // TODO: テスト用
  function testMode() {
    $('[name="unit_price"]').val("800000");
    // $('[name="officer_amount"]').val("500000");
    $('[name="resident_tax"]').val("20000");
    $('[name="transportation_expenses"]').val("10000");
    $('[name="performance_salary"]').val("0");
  }

  // 初期化処理
  function initAction() {
    $('#input_officer_amount').hide();
    $('#input_mode').show();
    $('#result_mode').hide();
  }

  $('[name="employment_status"]').on('change', function() {
    employmentStatus = this.value;
    if (employmentStatus === '役員') {
      $('#input_officer_amount').show();
    } else {
      $('#input_officer_amount').hide();
    }
  });

  $('#subAction').on('click', function() {
    if (document.getElementsByName('employment_status')[0].value === '役員') {
      payRoll(
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
      payRoll(
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
  });

  $('#restart').on('click', function() {
    location.reload();
  });

  function payRoll(
    unit_price,
    officer_amount,
    resident_tax,
    transportation_expenses,
    performance_salary,
    dependents,
    age,
    employment_status,
  ) {
    console.log('==============API開始');
    $.ajax('https://script.google.com/a/macros/reigle.jp/s/AKfycby_H3DypM98ApQ7zt3lTtEJ37o20UE70g5FQNwr_o7HLQ3Ih0LATR12/exec', {
        type: 'get',
        data: {
          unit_price,
          officer_amount,
          resident_tax,
          transportation_expenses,
          performance_salary,
          dependents,
          age,
          employment_status,
        },
      }
    )
    .done(function(data) {
      console.log('==============API成功');
      result = {
        base_salary: data.result.base_salary,
        commuting_salary: data.result.commuting_salary,
        employment_insurance: data.result.employment_insurance,
        fixed_midnight_surcharge_salary: data.result.fixed_midnight_surcharge_salary,
        fixed_overtime_salary: data.result.fixed_overtime_salary,
        health_insurance: data.result.health_insurance,
        income_tax: data.result.income_tax,
        job_salary: data.result.job_salary,
        long_term_care_insurance: data.result.long_term_care_insurance,
        officer_salary: data.result.officer_salary,
        outcome_salary: data.result.outcome_salary,
        resident_tax: data.result.resident_tax,
        take_home_payment: data.result.take_home_payment,
        total_payment: data.result.total_payment,
        welfare_pension: data.result.welfare_pension,
      }

      if (employmentStatus === '役員') {
        $('#other_result').hide();
        $('#officer_result').show();
      } else {
        $('#other_result').show();
        $('#officer_result').hide();
      }

      $('.base_salary').text(data.result.base_salary);
      $('.commuting_salary').text(data.result.commuting_salary);
      $('.employment_insurance').text(data.result.employment_insurance);
      $('.fixed_midnight_surcharge_salary').text(data.result.fixed_midnight_surcharge_salary);
      $('.fixed_overtime_salary').text(data.result.fixed_overtime_salary);
      $('.health_insurance').text(data.result.health_insurance);
      $('.income_tax').text(data.result.income_tax);
      $('.job_salary').text(data.result.job_salary);
      $('.long_term_care_insurance').text(data.result.long_term_care_insurance);
      $('.officer_salary').text(data.result.officer_salary);
      $('.outcome_salary').text(data.result.outcome_salary);
      $('.resident_tax').text(data.result.resident_tax);
      $('.take_home_payment').text(data.result.take_home_payment);
      $('.total_payment').text(data.result.total_payment);
      $('.welfare_pension').text(data.result.welfare_pension);
      
      $('#input_mode').hide();
      $('#result_mode').show();
    })
    .fail(function() {
      console.log('==============API失敗');
      alert('正しい結果を得られませんでした。');
    });
  }
});
