package com.ovt.alarm.dao.vo;

import java.util.List;

public class CommonList<T>
{
	private int resultSize = 0;
	private long totalSize = 0;
	private List<T> list;
	
	public int getResultSize() {
		return resultSize;
	}
	public void setResultSize(int resultSize) {
		this.resultSize = resultSize;
	}
	public long getTotalSize() {
		return totalSize;
	}
	public void setTotalSize(long totalSize) {
		this.totalSize = totalSize;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	
}
