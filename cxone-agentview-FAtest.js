var is_outbound = $("#in_or_outbound").text();
var show_customer_said = $("#show_customer_said").text();
var transferred_flag = $("#transferred_flag").text();
var using_moa = $("#using_moa").text();
var is_customer = $("#is_customer").text();
var temp_transfer_string = $("#transferhistory").text();
var display_customer_name = $("#display_customer_name").text();
var display_service_number = $("#display_service_number").text();
var display_account_number = $("#display_account_number").text();
var repeat_contact_level = $("#repeat_contact_level").text();
var repeat_contact_tooltip = $("#repeat_contact_tooltip").text();
var ccai_show_agentassist = $("#ccai_show_agentassist").text();

//MFA variables
var ccai_auth_status = $('#ccai_auth_status').text().toUpperCase();
var ccai_auth_contact_id = $("#ccai_auth_contact_id").text();
var ccai_auth_contact_matched = $("#ccai_auth_contact_matched").text();
var ccai_auth_dob = $("#ccai_auth_dob").text();
var ccai_auth_otp_status = $("#ccai_auth_otp_status").text();
var ccai_auth_postcode = $("#ccai_auth_postcode").text();

//For oubound dialler campaigns
var campaign_name = $("#display_campaign_name").text();
var campaign_group = $("#display_campaign_group").text();
var campaign_offer_desc = $("#display_campaign_offer_desc").text();
//Fin

var identity_object = {};
var customer_type = "";

//Customer found triggers
if (display_customer_name == "" || display_customer_name == "{display_customer_name}") {
    $("#customer_name>a>b").text("Account not found");
    $("#customer_name>a>b").css("color", "#74767b");
    $("#identify_customer_tip").removeClass("d-none");
} else {
    $("#known_id_info").removeClass("d-none");
    $("#address_row").removeClass("d-none");
}

//Show or hide conversation summary iFrame
if (ccai_show_agentassist.toLowerCase() == "true" || ccai_show_agentassist == 1) {
    $("#main-panel").removeClass('col-12').addClass('col-8');
    $("#convo-summary").addClass('col-4').removeClass('d-none');
} else {
    $("#main-panel").addClass('col-12').removeClass('col-8');
    $("#convo-summary").removeClass('col-4').addClass('d-none');
}

//Outbound or Inbound triggers
if (is_outbound == 1) {
    $("#header").css("background-color", "#a43fbd");
    $(".header_contents").css("padding-top", "1rem");
    $(".outbound_header").removeClass("d-none");
    $("#outbound_row").removeClass("d-none");
    $("#outbound_state").removeClass("d-none");
} else {
    $("#header").css("background-color", "#00a3ad");
    $(".inbound_header").removeClass("d-none");
    if (show_customer_said == 1) {
        $("#header-2").removeClass("d-none");
    }
}

if (ccai_auth_status == "MFA_SUCCESS") {
    //$("#mfa_row").css("background-color", "#eef9ed");
    $("#mfa_icon").addClass("bi-check-circle-fill");
    $("#mfa_icon").css("color", "#3a7e30");

    $("#mfa_row").removeClass("d-none");
    $("#verified_details_row").removeClass("d-none");
}

if (ccai_auth_status == 'NOT_OFFERED') {
    $('#verified_details_section').remove();
    $("#mfa_row").removeClass("d-none");
}

if (transferred_flag == 0) {
    if (ccai_auth_status == "STEP1_INCOMPLETE" || ccai_auth_status == "STEP2_INCOMPLETE" || ccai_auth_status == "APPAUTH_INCOMPLETE" ) {
        //$("#mfa_row").css("background-color", "#e7eff8");
        $("#mfa_icon").addClass("bi-exclamation-circle-fill");
        $("#mfa_icon").css("color", "#0b5dbc");

        $("#mfa_row").removeClass("d-none");
        switch (ccai_auth_status) {
            case "STEP1_INCOMPLETE":
                $('#verified_details_section').remove();
                break;
            case "STEP2_INCOMPLETE":
                $("#verified_details_row").removeClass("d-none");
                $(".step2_incomplete_row").removeClass("d-none");
                break;
            case "APPAUTH_INCOMPELTE":
                $('#verified_details_section').remove();
                break;    
        }
    } else if (ccai_auth_status == "NUMBER_VERIFICATION_FAIL") {
        $('#verified_details_section').remove();
        //$("#mfa_row").css("background-color", "#fcedea");
        $("#mfa_icon").addClass("bi-exclamation-circle-fill");
        $("#mfa_icon").css("color", "#d93a1b");

        // $("#mfa_row").removeClass("d-none");
    }
} else if (transferred_flag == 1 && ccai_auth_status != "MFA_SUCCESS") {
    $('#verified_details_section').remove();
}

$("#mfa_row > #" + ccai_auth_status).removeClass('d-none');

var display_tas_name = $("#display_tas_name").text();
var lookup_performed_flag = $("#lookup_performed_flag").text();
var multiple_services_flag = $("#api_profile_number_of_active_services").text();

is_customer == 0 && lookup_performed_flag == 1 ? $("#cust_not_found_btn").removeClass("d-none") : "";
transferred_flag == 1 ? $("#transfer_btn").removeClass("d-none") : "";
using_moa == 1 ? $("#moa_yes_btn").removeClass("d-none") : "";
using_moa == 0 && is_customer == 1 ? $("#moa_no_btn").removeClass("d-none") : "";
multiple_services_flag > 1 && is_customer == 1 ? $("#multi_serv_btn").removeClass("d-none") : "";

switch (repeat_contact_level) {
    case 'medium':
        $("#repeat_contact_badge").addClass('badge-warning');
        $("#repeat_contact_badge").css('background-color', 'orange');
        $("#repeat_contact_btn").attr("title", repeat_contact_tooltip);
        $("#repeat_contact_btn").removeClass("d-none")
        break;
    case 'high':
        $("#repeat_contact_badge").addClass('badge-danger');
        $("#repeat_contact_btn").removeClass("d-none")
        $("#repeat_contact_btn").attr("title", repeat_contact_tooltip);
        break;
    default:
        $("#repeat_contact_btn").addClass("d-none")
        break;
}

//Set sizing of the panel
var width = 1024;
var height = 600;
self.resizeTo(width, height);

//Triggers icon changes when dropdowns toggled
$('#cust_details_header').on('click', function() {
    if ($('#cust_details_header').hasClass('collapsed')) {
        $("#cust_details_icon").removeClass("bi-chevron-down");
        $("#cust_details_icon").addClass("bi-chevron-up");
    } else {
        $("#cust_details_icon").removeClass("bi-chevron-up");
        $("#cust_details_icon").addClass("bi-chevron-down");
    }
})

$('#verified_details_header').on('click', function() {
    if ($('#verified_details_header').hasClass('collapsed')) {
        $("#verified_details_icon").removeClass("bi-chevron-down");
        $("#verified_details_icon").addClass("bi-chevron-up");
    } else {
        $("#verified_details_icon").removeClass("bi-chevron-up");
        $("#verified_details_icon").addClass("bi-chevron-down");
    }
})

$('#outbound_details_header').on('click', function() {
    if ($('#outbound_details_header').hasClass('collapsed')) {
        $("#outbound_icon").removeClass("bi-chevron-down");
        $("#outbound_icon").addClass("bi-chevron-up");
    } else {
        $("#outbound_icon").removeClass("bi-chevron-up");
        $("#outbound_icon").addClass("bi-chevron-down");
    }
})

const LEFT_PANEL_WIDTH = 395;
const BREAKPOINT_1 = 973 - LEFT_PANEL_WIDTH;
const BREAKPOINT_2 = 2574 - LEFT_PANEL_WIDTH;
function updateSizing() {
    const screenWidth = window.innerWidth;
    const colRegex = /col-(\d+|auto)/;
    const plRegex = /pl-(\d|auto)/;

    if (screenWidth >= BREAKPOINT_2) {
        $('#main-panel').attr('class', (i, c) => c.replace(colRegex, 'col-8'));
        $('#convo-summary').attr('class', (i, c) => c.replace(colRegex, 'col-4'));
        $('#address_row > div').attr('class', (i, c) => c.replace(colRegex, 'col-6'));
        $('.accordion-body > div').attr('class', (i, c) => c.replace(colRegex, 'col-6'));
        $('#verified_details_row > div').attr('class', (i, c) => c.replace(colRegex, 'col-6'));
    } else {
        $('#address_row > div').attr('class', (i, c) => c.replace(colRegex, 'col-12'));
        $('.accordion-body > div').attr('class', (i, c) => c.replace(colRegex, 'col-12'));
        $('#verified_details_row > div').attr('class', (i, c) => c.replace(colRegex, 'col-12'));
    }

    if (screenWidth >= BREAKPOINT_1 && screenWidth < BREAKPOINT_2) {
        $('#main-panel').attr('class', (i, c) => c.replace(colRegex, 'col-7'));
        $('#convo-summary').attr('class', (i, c) => c.replace(colRegex, 'col-5'));
    }

    if (screenWidth < BREAKPOINT_1) {
        $('#main-panel').attr('class', (i, c) => c.replace(colRegex, 'col-12'));
        $('#convo-summary').attr('class', (i, c) => c.replace(colRegex, 'col-12').replace(plRegex, 'pl-0')).addClass('out-of-view');
    } else {
        $('#convo-summary').attr('class', (i, c) => c.replace(plRegex, 'pl-2')).removeClass('out-of-view');
    }
}

$('#convo-summary-open').on('click', () => {
    $('#convo-summary').removeClass('out-of-view').addClass('expanded');
});

$('#convo-summary-close').on('click', () => {
    $('#convo-summary').addClass('out-of-view').removeClass('expanded');
});

//Transfer display generation
try {
    var transferhistory_json = JSON.parse(temp_transfer_string);
    transferhistory_json = transferhistory_json.reverse();
} catch (SyntaxError) {
    var transferhistory_json = {};
}

if (transferhistory_json.length > 0) {
    var transfer_info = '<div class="col-auto" style="text-align: center;"><h5 class="card-title transfer_history_you"><span class="dot" style="color: #00a1ae;">0</span>You</h5></div>';
    var list_counter = transferhistory_json.length;

    for (const key in transferhistory_json) {
        if (Object.hasOwnProperty.call(transferhistory_json, key)) {
            const element = transferhistory_json[key];
            transfer_info += '<div class="col-1" style="margin-left: 0.5rem;">--------</div><div class="col-auto" style="text-align: center;"><h5 class="card-title transfer_history"><span class="dot">' + (list_counter - key) + "</span>" + element.transferName + '</h5><p class="transfer-history-card-text card-text">' + element.transferDateTime + "</p></div>";
        }
    }
    $("#transfer_history_card>.row").html(transfer_info);
}

//Enables copy to clipboard functionality
$(document).on("click", ".copy-btn", function(e) {
    var content_selector = $(this).attr("id").replace(/_copy/g, "");
    var copyText = document.getElementById(content_selector).textContent;
    navigator.clipboard.writeText(copyText);
});

updateSizing();
$(window).on('resize', updateSizing);

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
})
