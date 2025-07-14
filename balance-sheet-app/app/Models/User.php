<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}

public function assets()
{
    return $this->hasMany(Asset::class);
}

public function liabilities()
{
    return $this->hasMany(Liability::class);
}

public function getTotalAssetsAttribute()
{
    return $this->assets()->sum('amount');
}

public function getTotalLiabilitiesAttribute()
{
    return $this->liabilities()->sum('amount');
}

public function getNetWorthAttribute()
{
    return $this->total_assets - $this->total_liabilities;
}