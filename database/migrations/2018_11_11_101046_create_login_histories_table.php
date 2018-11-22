<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLoginHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('login_histories', function (Blueprint $table) {
            $table->increments('id')                            ->comment('主キー');
            $table->unsignedInteger('user_id')->nullable(false) ->comment('ユーザID');
            $table->ipAddress('ip_address')->nullable(false)    ->comment('ログインIPアドレス');
            $table->timestampTz('date')->nullable(false)        ->comment('ログイン日時');

            $table->index('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('login_histories');
    }
}
