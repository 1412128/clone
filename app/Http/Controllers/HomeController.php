<?php



namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Url;
use Illuminate\Support\Facades\View;

class HomeController extends Controller
{
   
    public function index()
    {
        return view('home');
    }

    public function validateLink($url)
    {
        $regular = '/^(http:\/\/|https:\/\/)?[\w]+(\.{1}[\w]+)+(\S*)$/';

        if (strlen($url) < 2048 && $check = preg_match($regular, $url)) {
            return true;
        } else {
            return false;
        }
    }

    public function encode($id) {
        $alphabet = 'abcdefghilmnopqrstuvwxyzABCDEGHIJKLMNOPQRSTUVWXZ012345789-';
        $addition = 'kjY6F';
        $length = strlen($alphabet);
        $shortlink = '';

        while($id > 0) {
            $shortlink = $shortlink . $alphabet[(int)($id % $length)]  ;
            $id = (int)($id / $length);
        }
        while(strlen($shortlink) < 6) {
            $shortlink = $addition[rand(0, strlen($addition) - 1)] . $shortlink;
        }
        $shortlink = $alphabet[rand(0, strlen($alphabet) - 1)] . $shortlink;
        return  $shortlink;

    }

    public function short(Request $req)
    {
        $isError = true;

        $old_id = DB::table('url')->max('id');

        $short_url = HomeController::encode($old_id + 1);

        $url = new Url();

        if(!HomeController::validateLink($req->org_url)) {
            $notify_error = "Invalid URL";
            $isError = true;
            return response()->json(['data' =>  $notify_error ,'isError' =>  $isError]);

        }

        if(empty($req->custom_url)) {
            $row = Url::where('url_original',$req->org_url)->get();
            if(count($row) > 0) {
                $isError = false;
                return response()->json(['data' =>  $row ,'isError' =>  $isError]);
            }
            else {
                $url->url_original = $req->org_url;
                $url->url_shorten =  $short_url;
                $url->short_type = 0;
            }
        }
        else {
            $row_custom = Url::where('url_shorten', $req->custom_url)->get();
            if(count($row_custom) > 0) {
                $notify_error = "This link already existed. Please choose another short link";
                $isError = true;
               return response()->json(['data' =>  $notify_error ,'isError' =>  $isError]);
            }
            else {
                $url->url_original = $req->org_url;
                $url->url_shorten =  $req->custom_url;
                $url->short_type = 1;
                $url->url_info = "";
            }
        }
        $url->save();
        $current_id = DB::table('url')->max('id');
        $data = Url::where('id',$current_id)->get();
        $isError = false;
        return response()->json(['data' =>  $data ,'isError' =>  $isError]);

    }
    
}
