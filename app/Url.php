<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    protected $table ='url';
    public $timestamps = false;

    protected $guarded = [
        'id'
    ];

    protected $fillable = [
        'url_original',
        'url_shorten',
        'created_At',
        'url_info'
    ];

}
