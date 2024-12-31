var is_outbound = $("#in_or_outbound").text();
var customer_said = $("#show_customer_said").text();
var trans_flag = $("#transferred_flag").text();
var moa_flag = $("#using_moa").text();
var is_customer_flag = $("#is_customer").text();
var temp_transfer_string = $("#transferhistory").text();
var cust_name = $("#display_customer_name").text();
var service_number = $("#display_service_number").text();
var account_number = $('#display_account_number').text();

// For outbound dialler campaigns
var campaign_name = $('#display_campaign_name').text();
var campaign_group = $('#display_campaign_group').text();
var campaign_offer_desc = $('#display_campaign_offer_desc').text();
// Fin

var identity_object = {};
var customer_type = "";

// Check if Newskill is equal to gcr_outbound
if (Newskill === 'gcr_outbound') {
    ASSIGN global:show_payment_button = 1;
}

if (cust_name == "" || cust_name == '{display_customer_name}') {
    $("#customer_name>a>b").text("Account not found");
    $("#customer_name>a>b").css("color", "#74767b");
    $("#identify_customer_tip").removeClass("d-none");
} else {
    $("#known_id_info").removeClass("d-none");
    $("#address_row").removeClass("d-none");
}

if (is_outbound == 1) {
    $("#header").css("background-color", "#a43fbd");
    $(".header_contents").css("padding-top", "1rem");
    $(".outbound_header").removeClass("d-none");
    $("#outbound_row").removeClass("d-none");
    $("#outbound_state").removeClass("d-none");
} else {
    $("#header").css("background-color", "#00a3ad");
    $(".inbound_header").removeClass("d-none");
    $("#outbound_row").addClass("d-none");
    if (customer_said == 1) {
        $("#header-2").removeClass("d-none");
    }
}

try {
    var transferhistory_json = JSON.parse(temp_transfer_string);
    transferhistory_json = transferhistory_json.reverse();
} catch (SyntaxError) {
    var transferhistory_json = {};
}

var display_tas_name = $("#display_tas_name").text();
var lookup_performed_flag = $("#lookup_performed_flag").text();
var multiple_services_flag = $("#api_profile_number_of_active_services").text();

is_customer_flag == 0 && lookup_performed_flag == 1 ? $("#cust_not_found_btn").removeClass("d-none") : "";
trans_flag == 1 ? $("#transfer_btn").removeClass("d-none") : "";
moa_flag == 1 ? $("#moa_yes_btn").removeClass("d-none") : "";
moa_flag == 0 && is_customer_flag == 1 ? $("#moa_no_btn").removeClass("d-none") : "";
multiple_services_flag > 1 && is_customer_flag == 1 ? $("#multi_serv_btn").removeClass("d-none") : "";

var width = 1024;
var height = 600;
self.resizeTo(width, height);

$("#headingOne > a").on("click", "hide.bs.collapse", function() {
    $("#cust_details_icon").toggleClass("bi-chevron-right bi-chevron-down");
});
$("#headingOne > a").on("click", "show.bs.collapse", function() {
    $("#cust_details_icon").toggleClass("bi-chevron-down bi-chevron-right");
});
$("#headingTwo > a").on("click", "hide.bs.collapse", function() {
    $("#call_id_icon").toggleClass("bi-chevron-right bi-chevron-down");
});
$("#headingTwo > a").on("click", "show.bs.collapse", function() {
    $("#call_id_icon").toggleClass("bi-chevron-down bi-chevron-right");
});
$("#headingThree > a").on("click", "hide.bs.collapse", function() {
    $("#outbound_icon").toggleClass("bi-chevron-right bi-chevron-down");
});
$("#headingThree > a").on("click", "show.bs.collapse", function() {
    $("#outbound_icon").toggleClass("bi-chevron-down bi-chevron-right");
});

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

$(document).on("click", ".copy-btn", function(e) {
    var content_selector = $(this).attr("id").replace(/_copy/g, "");
    var copyText = document.getElementById(content_selector).textContent;
    navigator.clipboard.writeText(copyText);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}