<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Url extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('url', function (Blueprint $table){
            $table->bigIncrements('id');
            $table->text('url_original',2048);
            $table->string('url_shorten', 20);
            $table->tinyInteger('short_type');
            $table->longText('url_info');
            $table->timestamp('created_at');
            $table->unique('url_shorten');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('url');
    }
}
